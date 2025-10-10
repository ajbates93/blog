<template>
  <ClientOnly>
    <div 
      ref="terminalContainer" 
      class="terminal-container bg-black rounded-lg border border-gray-600 overflow-hidden shadow-inner"
      :style="{ height: terminalHeight + 'px' }"
    />
    <template #fallback>
      <div class="terminal-container bg-black rounded-lg border border-gray-600 overflow-hidden shadow-inner flex items-center justify-center" :style="{ height: terminalHeight + 'px' }">
        <div class="text-green-400 font-mono">Loading terminal...</div>
      </div>
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
// Client-side only component
defineOptions({
  inheritAttrs: false
})

// Dynamic imports to avoid SSR issues
const Terminal = ref<any>(null)
const WebLinksAddon = ref<any>(null)

interface TerminalCommand {
  name: string
  description: string
  execute: (args: string[]) => Promise<string>
}

interface FileSystemItem {
  name: string
  type: 'file' | 'directory'
  path: string
}

const terminalContainer = ref<HTMLElement>()
const terminalHeight = ref(400)

let terminal: any = null
let currentPath = '/home/alex'
let commandHistory: string[] = []
let historyIndex = -1

// File system structure for navigation
const fileSystem: FileSystemItem[] = [
  { name: 'blog', type: 'directory', path: '/home/alex/blog' },
  { name: 'projects', type: 'directory', path: '/home/alex/projects' },
  { name: 'about.txt', type: 'file', path: '/home/alex/about.txt' },
  { name: 'contact.txt', type: 'file', path: '/home/alex/contact.txt' },
  { name: 'resume.pdf', type: 'file', path: '/home/alex/resume.pdf' }
]

// Blog posts for navigation
const blogPosts = [
  { name: 'become-a-father.md', type: 'file', path: '/home/alex/blog/become-a-father.md' },
  { name: 'building-this-blog.md', type: 'file', path: '/home/alex/blog/building-this-blog.md' },
  { name: 'learning-flutter.md', type: 'file', path: '/home/alex/blog/learning-flutter.md' },
  { name: 'middlesbrough-front-end-conference.md', type: 'file', path: '/home/alex/blog/middlesbrough-front-end-conference.md' }
]

// Get all items for current directory
const getCurrentDirectoryItems = () => {
  if (currentPath === '/home/alex/blog') {
    return blogPosts
  }
  return fileSystem.filter(item => 
    item.path.startsWith(currentPath) && 
    item.path !== currentPath &&
    !item.path.substring(currentPath.length + 1).includes('/')
  )
}

// Terminal commands
const commands: Record<string, TerminalCommand> = {
  ls: {
    name: 'ls',
    description: 'List directory contents',
    execute: async (args: string[]) => {
      const items = getCurrentDirectoryItems()
      
      if (items.length === 0) {
        return 'No files or directories found.'
      }
      
      return items.map(item => {
        const icon = item.type === 'directory' ? '📁' : '📄'
        return `${icon} ${item.name}`
      }).join('\n')
    }
  },
  
  cd: {
    name: 'cd',
    description: 'Change directory',
    execute: async (args: string[]) => {
      if (args.length === 0) {
        currentPath = '/home/alex'
        return ''
      }
      
      const targetPath = args[0]
      if (!targetPath) return ''
      
      let newPath = currentPath
      
      if (targetPath === '..') {
        newPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
        if (newPath === '') newPath = '/'
      } else if (targetPath.startsWith('/')) {
        newPath = targetPath
      } else {
        newPath = currentPath === '/' ? `/${targetPath}` : `${currentPath}/${targetPath}`
      }
      
      // Check if directory exists
      const allItems = [...fileSystem, ...blogPosts]
      const dirExists = allItems.some(item => 
        item.type === 'directory' && item.path === newPath
      ) || newPath === '/home/alex' || newPath === '/' || newPath === '/home/alex/blog'
      
      if (dirExists) {
        currentPath = newPath
        return ''
      } else {
        return `cd: ${targetPath}: No such file or directory`
      }
    }
  },
  
  cat: {
    name: 'cat',
    description: 'Display file contents',
    execute: async (args: string[]) => {
      if (args.length === 0) {
        return 'cat: missing file operand'
      }
      
      const fileName = args[0]
      const filePath = currentPath === '/' ? `/${fileName}` : `${currentPath}/${fileName}`
      
      const file = fileSystem.find(item => item.path === filePath && item.type === 'file')
      
      if (!file) {
        return `cat: ${fileName}: No such file or directory`
      }
      
      // Return different content based on file name
      switch (fileName) {
        case 'about.txt':
          return `Hello! I'm Alex Bates, a software developer with over ${new Date().getFullYear() - 2015} years of experience.

I'm currently working at Pocketworks as a Full Stack Developer, building web and mobile applications for clients across various industries.

I love working with modern technologies like Vue.js, Nuxt.js, TypeScript, and Flutter. When I'm not coding, you can find me writing about my experiences on my blog or exploring new technologies.

Feel free to explore my blog directory or check out my contact information!`
        
        case 'contact.txt':
          return `Contact Information:
==================

Email: hello@alexbates.dev
GitHub: https://github.com/ajbates93
LinkedIn: https://www.linkedin.com/in/alex-bates-01b548a7

I'm currently available for freelance work!
Drop me an email to discuss your project.`
        
        case 'resume.pdf':
          return `This is a PDF file. To view it, please visit: https://alexbates.dev/resume`
        
        case 'become-a-father.md':
          return `# Becoming a Father

This is a blog post about my journey into fatherhood. 

To read the full post, visit: /blog/become-a-father

Use 'open become-a-father.md' to navigate there directly!`
        
        case 'building-this-blog.md':
          return `# Building This Blog

This post covers the technical details of building this blog with Nuxt.js and Vue.

To read the full post, visit: /blog/building-this-blog

Use 'open building-this-blog.md' to navigate there directly!`
        
        case 'learning-flutter.md':
          return `# Learning Flutter

My experience learning Flutter for mobile development.

To read the full post, visit: /blog/learning-flutter

Use 'open learning-flutter.md' to navigate there directly!`
        
        case 'middlesbrough-front-end-conference.md':
          return `# Middlesbrough Front End Conference

My experience attending and speaking at the Middlesbrough Front End Conference.

To read the full post, visit: /blog/middlesbrough-front-end-conference

Use 'open middlesbrough-front-end-conference.md' to navigate there directly!`
        
        default:
          return `File contents for ${fileName}`
      }
    }
  },
  
  open: {
    name: 'open',
    description: 'Open a file or navigate to a page',
    execute: async (args: string[]) => {
      if (args.length === 0) {
        return 'open: missing file operand'
      }
      
      const fileName = args[0]
      if (!fileName) return 'open: missing file operand'
      
      // Handle blog post navigation
      if (fileName.endsWith('.md') && currentPath === '/home/alex/blog') {
        const blogSlug = fileName.replace('.md', '')
        const router = useRouter()
        
        // Navigate to the blog post
        await router.push(`/blog/${blogSlug}`)
        return `Opening ${fileName}...`
      }
      
      // Handle other files
      const filePath = currentPath === '/' ? `/${fileName}` : `${currentPath}/${fileName}`
      const allItems = [...fileSystem, ...blogPosts]
      const file = allItems.find(item => item.path === filePath && item.type === 'file')
      
      if (!file) {
        return `open: ${fileName}: No such file or directory`
      }
      
      // Handle different file types
      switch (fileName) {
        case 'resume.pdf':
          window.open('https://alexbates.dev/resume', '_blank')
          return `Opening ${fileName} in new tab...`
        
        case 'about.txt':
        case 'contact.txt':
          return `Use 'cat ${fileName}' to view the contents of this file.`
        
        default:
          return `File ${fileName} opened.`
      }
    }
  },
  
  help: {
    name: 'help',
    description: 'Show available commands',
    execute: async () => {
      return `Available commands:
==================

ls          - List directory contents
cd <dir>    - Change directory
cat <file>  - Display file contents
open <file> - Open a file or navigate to a page
help        - Show this help message
clear       - Clear the terminal
whoami      - Display current user
pwd         - Print working directory
exit        - Close terminal

Try 'ls' to see what's available in the current directory!
Try 'cd blog' to explore my blog posts!`
    }
  },
  
  clear: {
    name: 'clear',
    description: 'Clear the terminal',
    execute: async () => {
      terminal?.clear()
      return ''
    }
  },
  
  whoami: {
    name: 'whoami',
    description: 'Display current user',
    execute: async () => {
      return 'alex'
    }
  },
  
  pwd: {
    name: 'pwd',
    description: 'Print working directory',
    execute: async () => {
      return currentPath
    }
  },
  
  exit: {
    name: 'exit',
    description: 'Close terminal',
    execute: async () => {
      terminal?.write('\r\nTerminal closed. Thanks for visiting!')
      return ''
    }
  }
}

// Initialize terminal
onMounted(async () => {
  console.log('Terminal component mounted')
  
  // Wait for next tick to ensure DOM is ready
  await nextTick()
  
  if (!terminalContainer.value) {
    console.error('Terminal container not found')
    return
  }
  
  console.log('Terminal container found:', terminalContainer.value)
  
  try {
    // Dynamic imports to avoid SSR issues
    console.log('Loading xterm modules...')
    const [{ Terminal: TerminalClass }, { WebLinksAddon: WebLinksAddonClass }] = await Promise.all([
      import('@xterm/xterm'),
      import('@xterm/addon-web-links')
    ])
    
    console.log('Modules loaded successfully')
    
    Terminal.value = TerminalClass
    WebLinksAddon.value = WebLinksAddonClass
    
    // Import CSS
    await import('@xterm/xterm/css/xterm.css')
    
    // Create terminal instance
    console.log('Creating terminal instance...')
    terminal = new TerminalClass({
    theme: {
      background: '#000000',
      foreground: '#00ff41',
      cursor: '#00ff41',
      black: '#000000',
      red: '#ff5555',
      green: '#50fa7b',
      yellow: '#f1fa8c',
      blue: '#5385c2',
      magenta: '#ff79c6',
      cyan: '#8be9fd',
      white: '#f8f8f2',
      brightBlack: '#6272a4',
      brightRed: '#ff6e6e',
      brightGreen: '#69ff94',
      brightYellow: '#ffffa5',
      brightBlue: '#d6acff',
      brightMagenta: '#ff92df',
      brightCyan: '#a4ffff',
      brightWhite: '#ffffff'
    },
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    fontSize: 14,
    lineHeight: 1.2,
    cursorBlink: true,
    cursorStyle: 'block'
  })
  
  // Add web links addon
  const webLinksAddon = new WebLinksAddonClass((event, uri) => {
    if (event.metaKey || event.ctrlKey) {
      window.open(uri, '_blank')
    }
  })
  terminal.loadAddon(webLinksAddon)
  
  // Open terminal
  console.log('Opening terminal...')
  terminal.open(terminalContainer.value)
  
  // Welcome message
  console.log('Writing welcome message...')
  terminal.write('\x1b[1;36mWelcome to Alex Bates\' Interactive Terminal!\x1b[0m\r\n')
  terminal.write('Type \x1b[1;33mhelp\x1b[0m to see available commands.\r\n')
  terminal.write('Try \x1b[1;33mls\x1b[0m to explore the file system!\r\n\r\n')
  
  // Initial prompt
  console.log('Writing initial prompt...')
  writePrompt()
  
  // Handle input
  console.log('Setting up input handler...')
  terminal.onData(handleInput)
  
  console.log('Terminal initialization complete!')
  
  } catch (error) {
    console.error('Error initializing terminal:', error)
  }
  
  // Handle resize
  const resizeObserver = new ResizeObserver(() => {
    // Terminal will auto-resize based on container
  })
  resizeObserver.observe(terminalContainer.value)
})

// Write command prompt
const writePrompt = () => {
  if (!terminal) {
    console.error('Terminal not available for writing prompt')
    return
  }
  
  const prompt = `\x1b[1;32malex@alexbates\x1b[0m:\x1b[1;34m${currentPath}\x1b[0m$ `
  console.log('Writing prompt:', prompt)
  terminal.write(prompt)
}

// Handle terminal input
const handleInput = async (data: string) => {
  if (!terminal) return
  
  const char = data.charCodeAt(0)
  
  // Handle special keys
  if (char === 13) { // Enter
    terminal.write('\r\n')
    
    // Get current line
    const line = terminal.buffer.active.cursorX > 0 
      ? terminal.buffer.active.getLine(terminal.buffer.active.cursorY)?.translateToString() || ''
      : ''
    
    const promptLength = `alex@alexbates:${currentPath}$ `.length
    const command = line.substring(promptLength).trim()
    
    if (command) {
      commandHistory.push(command)
      historyIndex = commandHistory.length
      
      await executeCommand(command)
    }
    
    writePrompt()
  } else if (char === 127) { // Backspace
    if (terminal.buffer.active.cursorX > 0) {
      terminal.write('\b \b')
    }
  } else if (char === 3) { // Ctrl+C
    terminal.write('^C\r\n')
    writePrompt()
  } else if (char >= 32) { // Printable characters
    terminal.write(data)
  }
}

// Execute command
const executeCommand = async (input: string) => {
  if (!terminal) return
  
  const parts = input.trim().split(' ')
  const commandName = parts[0]
  if (!commandName) return
  
  const args = parts.slice(1)
  
  const command = commands[commandName]
  
  if (command) {
    try {
      const result = await command.execute(args)
      if (result) {
        terminal.write(result + '\r\n')
      }
    } catch (error) {
      terminal.write(`Error executing command: ${error}\r\n`)
    }
  } else {
    terminal.write(`Command not found: ${commandName}\r\n`)
    terminal.write(`Type 'help' to see available commands.\r\n`)
  }
}

// Cleanup
onUnmounted(() => {
  terminal?.dispose()
})
</script>

<style scoped>
.terminal-container {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  padding: 8px;
}

/* Custom scrollbar for terminal */
.terminal-container :deep(.xterm-viewport) {
  scrollbar-width: thin;
  scrollbar-color: #333 #000;
}

.terminal-container :deep(.xterm-viewport)::-webkit-scrollbar {
  width: 8px;
}

.terminal-container :deep(.xterm-viewport)::-webkit-scrollbar-track {
  background: #000;
}

.terminal-container :deep(.xterm-viewport)::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

.terminal-container :deep(.xterm-viewport)::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Terminal styling */
.terminal-container :deep(.xterm) {
  padding: 8px;
}

.terminal-container :deep(.xterm-screen) {
  padding: 8px;
}
</style>
