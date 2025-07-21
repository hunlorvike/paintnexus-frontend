# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20 # Add Node.js v20 for Remix project
  ];
  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "dbaeumer.vscode-eslint" # ESLint extension for code quality
      "esbenp.prettier-vscode" # Prettier extension for code formatting
      "bradlc.vscode-tailwindcss" # Tailwind CSS IntelliSense extension
    ];
    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Command to run your Remix development server, passing the dynamically assigned PORT
          command = ["npm" "run" "dev" "--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Install Node.js dependencies
        npm-install = "npm install";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ ".idx/dev.nix" "README.md" ];
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Start the Remix development server
        dev-server = "npm run dev";
      };
    };
  };
}
