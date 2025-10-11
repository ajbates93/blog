<template>
  <ClientOnly>
    <div 
      ref="terminalContainer" 
      class="terminal-container bg-black rounded-lg border border-gray-600 overflow-hidden shadow-inner flex-1"
    />
    <template #fallback>
      <div class="terminal-container bg-black rounded-lg border border-gray-600 overflow-hidden shadow-inner flex items-center justify-center flex-1">
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
const FitAddon = ref<any>(null)

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

let terminal: any = null
let fitAddon: any = null
let currentPath = '/home/alex'
let commandHistory: string[] = []
let historyIndex = -1
let currentInput = ''

// File system structure for navigation
const fileSystem: FileSystemItem[] = [
  { name: 'blog', type: 'directory', path: '/home/alex/blog' },
  { name: 'projects', type: 'directory', path: '/home/alex/projects' },
  { name: 'about.txt', type: 'file', path: '/home/alex/about.txt' },
  { name: 'contact.txt', type: 'file', path: '/home/alex/contact.txt' },
  { name: 'work', type: 'file', path: '/home/alex/work' }
]

// Blog posts for navigation
const blogPosts = [
  { name: 'become-a-father.md', type: 'file', path: '/home/alex/blog/become-a-father.md' },
  { name: 'building-this-blog.md', type: 'file', path: '/home/alex/blog/building-this-blog.md' },
  { name: 'learning-flutter.md', type: 'file', path: '/home/alex/blog/learning-flutter.md' },
  { name: 'middlesbrough-front-end-conference.md', type: 'file', path: '/home/alex/blog/middlesbrough-front-end-conference.md' }
]

// Projects for navigation
const projects = [
  { name: 'coming-soon.txt', type: 'file', path: '/home/alex/projects/coming-soon.txt' }
]

// Get all items for current directory
const getCurrentDirectoryItems = () => {
  if (currentPath === '/home/alex/blog') {
    return blogPosts
  }
  if (currentPath === '/home/alex/projects') {
    return projects
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
      }).join('\r\n')
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
      const allItems = [...fileSystem, ...blogPosts, ...projects]
      const dirExists = allItems.some(item => 
        item.type === 'directory' && item.path === newPath
      ) || newPath === '/home/alex' || newPath === '/' || newPath === '/home/alex/blog' || newPath === '/home/alex/projects'
      
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
      
      const allItems = [...fileSystem, ...blogPosts, ...projects]
      const file = allItems.find(item => item.path === filePath && item.type === 'file')
      
      if (!file) {
        return `cat: ${fileName}: No such file or directory`
      }
      
      // Return different content based on file name
      switch (fileName) {
        case 'about.txt':
          return `Hello! I'm Alex Bates, a software developer with over ${new Date().getFullYear() - 2015} years of experience.\r\n\r\nI'm currently working at Pocketworks (https://www.pocketworks.co.uk) as a Full Stack Developer, building web and mobile applications for clients across various industries.\r\n\r\nI love working with modern technologies like Vue.js, Nuxt.js, TypeScript, and Flutter. When I'm not coding, you can find me writing about my experiences on my blog or exploring new technologies.\r\n\r\nFeel free to explore my blog directory or check out my contact information!\r\n\r\nVisit my website: https://alexbates.dev`
        
        case 'contact.txt':
          return `Contact Information:\r\n==================\r\n\r\nEmail: hello@alexbates.dev\r\nGitHub: https://github.com/ajbates93\r\nLinkedIn: https://www.linkedin.com/in/alex-bates-01b548a7\r\nWebsite: https://alexbates.dev\r\n\r\nI'm currently available for freelance work!\r\nDrop me an email to discuss your project.\r\n\r\nClick any link above to visit!`
        
        case 'resume.pdf':
          return `This is a PDF file. To view it, please visit: https://alexbates.dev/resume`
        
        case 'work':
          return `This is a link to my work portfolio.\r\n\r\nTo view my work, visit: /work\r\n\r\nUse 'open work' to navigate there directly!`
        
        case 'coming-soon.txt':
          return `🚧 Coming Soon!\r\n\r\nI'm currently building out this section of my site.\r\n\r\nThis will showcase my projects, case studies, and work portfolio.\r\n\r\nCheck back soon, or feel free to reach out if you'd like to discuss my work!\r\n\r\nContact: hello@alexbates.dev\r\nWebsite: https://alexbates.dev`
        
        case 'become-a-father.md':
          return `# Becoming a Father\r\n\r\nThis is a blog post about my journey into fatherhood.\r\n\r\nTo read the full post, visit: /blog/become-a-father\r\n\r\nUse 'open become-a-father.md' to navigate there directly!`
        
        case 'building-this-blog.md':
          return `# Building This Blog\r\n\r\nThis post covers the technical details of building this blog with Nuxt.js and Vue.\r\n\r\nTo read the full post, visit: /blog/building-this-blog\r\n\r\nUse 'open building-this-blog.md' to navigate there directly!`
        
        case 'learning-flutter.md':
          return `# Learning Flutter\r\n\r\nMy experience learning Flutter for mobile development.\r\n\r\nTo read the full post, visit: /blog/learning-flutter\r\n\r\nUse 'open learning-flutter.md' to navigate there directly!`
        
        case 'middlesbrough-front-end-conference.md':
          return `# Middlesbrough Front End Conference\r\n\r\nMy experience attending and speaking at the Middlesbrough Front End Conference.\r\n\r\nTo read the full post, visit: /blog/middlesbrough-front-end-conference\r\n\r\nUse 'open middlesbrough-front-end-conference.md' to navigate there directly!`
        
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
      const allItems = [...fileSystem, ...blogPosts, ...projects]
      const file = allItems.find(item => item.path === filePath && item.type === 'file')
      
      if (!file) {
        return `open: ${fileName}: No such file or directory`
      }
      
      // Handle different file types
      switch (fileName) {
        case 'work':
          const router = useRouter()
          await router.push('/work')
          return `Opening ${fileName}...`
        
        case 'about.txt':
        case 'contact.txt':
        case 'coming-soon.txt':
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
      return `Available commands:\r\n==================\r\n\r\nls          - List directory contents\r\ncd <dir>    - Change directory\r\ncat <file>  - Display file contents\r\nopen <file> - Open a file or navigate to a page\r\nhelp        - Show this help message\r\nclear       - Clear the terminal\r\nwhoami      - Display current user\r\npwd         - Print working directory\r\nexit        - Close terminal\r\n\r\nTry 'ls' to see what's available in the current directory!\r\nTry 'cd blog' to explore my blog posts!`
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
  },
  
  // Easter egg for dangerous commands
  'rm': {
    name: 'rm',
    description: 'Remove files or directories',
    execute: async (args: string[]) => {
      if (args.includes('-rf') || args.includes('-r') || args.includes('-f')) {
        return `\x1b[1;31mNice try... 😏\x1b[0m`
      }
      return `rm: ${args.join(' ')}: Permission denied (this is a simulated terminal)`
    }
  },
  
  'sudo': {
    name: 'sudo',
    description: 'Execute command as superuser',
    execute: async (args: string[]) => {
      return `\x1b[1;33mNice try... 😏\x1b[0m`
    }
  },
  
  'chmod': {
    name: 'chmod',
    description: 'Change file permissions',
    execute: async () => {
      return `\x1b[1;33mNice try... 😏\x1b[0m`
    }
  },
  
  'kill': {
    name: 'kill',
    description: 'Terminate processes',
    execute: async () => {
      return `\x1b[1;31mNice try... 😏\x1b[0m`
    }
  },
  
  'format': {
    name: 'format',
    description: 'Format disk',
    execute: async () => {
      return `\x1b[1;31mNice try... 😏\x1b[0m`
    }
  }
}

// Initialize terminal
onMounted(async () => {
  // Wait for next tick to ensure DOM is ready
  await nextTick()
  
  if (!terminalContainer.value) {
    return
  }
  
  try {
    // Dynamic imports to avoid SSR issues
    const [{ Terminal: TerminalClass }, { WebLinksAddon: WebLinksAddonClass }, { FitAddon: FitAddonClass }] = await Promise.all([
      import('@xterm/xterm'),
      import('@xterm/addon-web-links'),
      import('@xterm/addon-fit')
    ])
    
    Terminal.value = TerminalClass
    WebLinksAddon.value = WebLinksAddonClass
    FitAddon.value = FitAddonClass
    
    // Import CSS
    await import('@xterm/xterm/css/xterm.css')
    
    // Create terminal instance
    terminal = new TerminalClass({
      theme: {
        background: '#000000',
        foreground: '#00ff41',
        cursor: '#00ff41',
        black: '#000000',
        red: '#ff5555',
        green: '#50fa7b',
        yellow: '#f1fa8c',
        blue: '#1e1d2c',
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
      cursorStyle: 'block',
      scrollback: 1000,
      allowTransparency: false
    })
  
  // Add web links addon
  const webLinksAddon = new WebLinksAddonClass((event, uri) => {
    // Handle different types of links
    if (event.metaKey || event.ctrlKey) {
      // Open in new tab
      window.open(uri, '_blank', 'noopener,noreferrer')
    } else {
      // Open in same tab
      window.open(uri, '_self')
    }
  }, {
    // Custom hover handler to show link preview
    hover: (event, text, location) => {
      // Could add tooltip functionality here in the future
    },
    // Custom leave handler
    leave: (event, text) => {
      // Clean up any tooltips
    },
    // Custom URL regex to catch more link patterns
    urlRegex: /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
  })
  terminal.loadAddon(webLinksAddon)
  
  // Add fit addon
  fitAddon = new FitAddonClass()
  terminal.loadAddon(fitAddon)
  
  // Open terminal
  terminal.open(terminalContainer.value)
  
  // Wait for terminal to be fully rendered before fitting
  await nextTick()
  
  // Fit the terminal to its container
  fitAddon.fit()
  
  // Also fit after a short delay to ensure everything is rendered
  setTimeout(() => {
    fitAddon.fit()
  }, 100)
  
  // Welcome message
  terminal.write('\x1b[1;36mNavigate by terminal instead!\x1b[0m\r\n')
  terminal.write('Type \x1b[1;33mhelp\x1b[0m to see available commands.\r\n')
  terminal.write('Try \x1b[1;33mls\x1b[0m to explore the file system!\r\n\r\n')
  
  // Initial prompt
  writePrompt()
  
  // Handle input
  terminal.onData(handleInput)
  
  } catch (error) {
    console.error('Error initializing terminal:', error)
  }
  
  // Handle resize
  const resizeObserver = new ResizeObserver(() => {
    // Fit the terminal when container resizes
    fitAddon.fit()
  })
  resizeObserver.observe(terminalContainer.value)
  
  // Also listen for window resize events
  const handleWindowResize = () => {
    fitAddon.fit()
  }
  window.addEventListener('resize', handleWindowResize)
  
  // Cleanup function
  onUnmounted(() => {
    window.removeEventListener('resize', handleWindowResize)
    resizeObserver.disconnect()
    terminal?.dispose()
    fitAddon = null
  })
})

// Write command prompt
const writePrompt = () => {
  if (!terminal) {
    return
  }
  
  const prompt = `\x1b[1;32malex@alexbates\x1b[0m:\x1b[1;34m${currentPath}\x1b[0m$ `
  terminal.write(prompt)
}

// Handle terminal input
const handleInput = async (data: string) => {
  if (!terminal) return
  
  const char = data.charCodeAt(0)
  
  // Handle special keys
  if (char === 13) { // Enter
    terminal.write('\r\n')
    
    if (currentInput.trim()) {
      commandHistory.push(currentInput)
      historyIndex = commandHistory.length
      
      await executeCommand(currentInput.trim())
    }
    
    // Reset current input
    currentInput = ''
    writePrompt()
  } else if (char === 127) { // Backspace
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1)
      terminal.write('\b \b')
    }
  } else if (char === 3) { // Ctrl+C
    terminal.write('^C\r\n')
    currentInput = ''
    writePrompt()
  } else if (char >= 32) { // Printable characters
    currentInput += data
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

</script>

<style scoped>
.terminal-container {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  padding: 8px;
  min-height: 0; /* Important for flex containers */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

/* Terminal styling */
.terminal-container :deep(.xterm) {
  padding: 8px;
  height: 100%;
  width: 100%;
  flex: 1;
}

.terminal-container :deep(.xterm-screen) {
  padding: 8px;
  height: 100%;
  width: 100%;
}

.terminal-container :deep(.xterm-viewport) {
  height: 100%;
  width: 100%;
  overflow-y: auto;
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

</style>
