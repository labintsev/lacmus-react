# Lacmus Web Frontend

This repository provides a minimal interface for an object detection task using React.

## Project Structure

```
.gitignore
eslint.config.js
index.html
package.json
public/
	logo.png
README.md
src/
	App.css
	App.jsx
	assets/
		react.svg
	index.css
	LeftPanel.jsx
	main.jsx
	RightPanel.jsx
vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/lacmus-react.git
    cd lacmus-react
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run:
```sh
npm run dev
```
This will start the Vite development server and you can view the application at `http://localhost:3000`.

### Building the Application

To build the application for production, run:
```sh
npm run build
```
The built files will be output to the `dist` directory.

### Linting the Code

To lint the code using ESLint, run:
```sh
npm run lint
```

## Project Details

### Main Components

- **App.jsx**: The main component that holds the layout of the application.
- **LeftPanel.jsx**: Component for the left panel which allows users to upload and preview images.
- **RightPanel.jsx**: Component for the right panel which displays the image and prediction results.

### Configuration Files

- **eslint.config.js**: Configuration for ESLint.
- **vite.config.js**: Configuration for Vite.

### Styles

- **App.css**: Contains the main styles for the application.
- **index.css**: Additional global styles.

### Assets

- **public/logo.png**: The favicon for the application.
- **src/assets/react.svg**: An example SVG asset.

## License

This project is licensed under the MIT License.
```