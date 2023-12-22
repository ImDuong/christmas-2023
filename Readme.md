# Prerequisites
- Requirements: 
    - Node.js
    - NPM/Yarn
- Use scripts inside `scripts/install` folder for quick start
    ```
    chmod +x ./scripts/install/install-mac.sh && ./scripts/install/install-mac.sh
    ```
    or 
    ```
    scripts\install\install-windows.cmd
    ```
- Or just install dependencies listed in package.json with
    ```
    yarn
    ```
    or 
    ```
    npm i
    ```

# How to Run
- Compile pug & less files to get static html & css files

    ```
    yarn run build
    ```
    or 
    ```
    npm run build
    ```

- To auto compile files in development stage, use 
    ```
    yarn run dev
    ```

# Notes
- For files in `src/components`, use `@@webRoot` to link the additional files. 
    - E.g.: if `src/components/storybox/index.pug` needs to include `src/components/storybox/storybox.css`, use `@@webRoot/components/storybox/storybox.css` in the pug file
- In compilation stage, each `.less` file will be compiled to corresponding stylesheet with `.css` extension. Therefore, pug files need to include stylesheet with `.css` extension instead of `.less`. 

# References
- https://codepen.io/Craaftx/pen/JwEqwQ
- https://codepen.io/VIRU/pen/DGXOjE
- https://wallpaperwaifu.com/sci-fi-fantasy/christmas-santa-claus-reindeer-live-wallpaper/