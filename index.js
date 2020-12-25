const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const Menu = electron.Menu
const Tray = electron.Tray
let trayIcon = path.join(__dirname, 'Logo.png')
let appIcon = null
let mainWindow = null

if (process.platform === 'win32') {
    app.commandLine.appendSwitch('high-dpi-support', 'true')
    app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow() {
    mainWindow = new BrowserWindow({
        icon: trayIcon,
        height: 700,
        width: 1600,
        maxHeight: 700,
        maxWidth: 1600,
        title: 'TechnobaseFM Client',
        autoHideMenuBar: true
    })

    appIcon = new Tray(trayIcon)
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Restore app',
            click: () => {
                mainWindow.show()
            }
        },
        {
            label: 'Turn off cigarette',
            click: () => {
                mainWindow.close()
            }
        }
    ])

    appIcon.setTitle('TechnobaseFM Client')
    appIcon.setToolTip('TechnobaseFM Client by Jens98')
    appIcon.setContextMenu(contextMenu)
    appIcon.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    })

    mainWindow.loadURL("https://www.technobase.fm/")

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('closed', function() {
        mainWindow = null
    })

    mainWindow.on('minimize',function(event){
        event.preventDefault()
        mainWindow.hide()
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})