# Data-viewer

Display Node.js data with live-reload in a web-based table viewer.

[![Build](https://github.com/thaitype/data-viewer/actions/workflows/main.yml/badge.svg)](https://github.com/thaitype/data-viewer/actions/workflows/main.yml) 
[![npm version](https://img.shields.io/npm/v/@thaitype/data-viewer-server)](https://www.npmjs.com/package/@thaitype/data-viewer-server) [![npm download](https://img.shields.io/npm/dt/@thaitype/data-viewer-server)](https://www.npmjs.com/package/@thaitype/data-viewer-server)


## Motivation 

When developing Node.js applications, it's often crucial to inspect and visualize data in a tabular format. While tools like [console-table-printer](https://github.com/ayonious/console-table-printer) or `console.table` are helpful, they may fall short when dealing with large datasets or multiple columns. This project aims to simplify the process of viewing tabular data by providing an easy-to-use and efficient web-based solution.

## Features

- **Live Reload:** Automatically updates the displayed data when the server is restarted.
- **Dynamic Table Support:** Works seamlessly with **`Record<string, unknown>[]`** data type and straightforward headers.

## Demo

![](images/demo.gif)

## Getting Started

1. Create a file named **`main.ts`**:

  ```ts
  import dataViewer from '@thaitype/data-viewer-server';

  const getUsers = async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json();
  const getPosts = async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json();

  async function main() {
    dataViewer.addHeader('User Table');
    dataViewer.addTable((await getUsers()));
    dataViewer.addHeader('Post Table');
    dataViewer.addTable(await getPosts());
    dataViewer.start();
  }

  main();
  ```

2. Run in watch mode using your preferred tool:

  ```bash
  tsx watch main.ts
  ```
3. The view is automatically updated when the server restarts.

## Idea Behind the Scene 

- Utilizes [Express.js](https://expressjs.com/) to run [EJS Templates](https://ejs.co/) by taking data from the server-side (Node.js) and rendering it using [DataTables](https://datatables.net/) jQuery to create the table.
- Implements [Socket.io](https://socket.io/) for handling real-time events.

## **Manual**

### **Custom Cell Formatter Function**

You can define a custom cell formatting function to tailor the appearance of individual cells. This function takes a cell value as input and returns the formatted string to be displayed in the table.

Example:

```ts
dataViewer.setOption({
  cellFormatter: cell => {
    if (typeof cell === 'object') {
      return JSON.stringify(cell);
    }
    return String(cell);
  },
});
```

In this example, the cell formatter checks if the cell value is an object, and if so, it converts it to a JSON string. Otherwise, it converts the cell value to a string.

### **Setup Log Level**

The package uses the [pino](https://github.com/pinojs/pino) package internally. Example: set up **`debug`** log level.

```ts
dataViewer.setOption({ 
  logger: {
    level: 'debug',
  },
});
```

### **Setup Port**

Example: Set up the server to run on port 5000.
```ts
dataViewer.setOption({ 
  port: 5000
});
```

### **Setup View (EJS Template) Directory**

Example: Specify a custom directory for EJS templates.

```ts
dataViewer.setOption({ 
  viewDirectory: __dirname + '/views'
});
```

By default, the viewDirectory is set to `__dirname + '/views'`.

### **Create a New Instance**

Rarely needed, but you can create a new instance.

```ts
import { DataViewer } from '@thaitype/data-viewer-server';

const myViewer = new DataViewer();
```

## **Acknowledgement**

- **EJS Template:** This project utilizes various packages, including [jQuery](https://jquery.com/), [DataTables](https://datatables.net/), [Bulma](https://bulma.io/), [Socket.io](https://socket.io/), [Toastify-JS](https://github.com/apvarun/toastify-js), and [UUID](https://github.com/uuidjs/uuid).

## **License**

This project is licensed under the MIT License.