# OpenLayers + Vite

This example demonstrates how the `ol` package can be used with [Vite](https://vitejs.dev/).

To get started, run the following (requires Node 14+):

    npx create-ol-app my-app --template vite

Then change into your new `my-app` directory and start a development server (available at http://localhost:5173):

    cd my-app
    npm start

To generate a build ready for production:

    npm run build

Then deploy the contents of the `dist` directory to your server.  You can also run `npm run serve` to serve the results of the `dist` directory for preview.
The output of map like this:  
![image](https://user-images.githubusercontent.com/58145645/225338188-285f14a5-a8c9-4e60-8892-24afd3fab748.png)

I used field "name_1" in the data to apply different colors based on.
