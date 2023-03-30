{
  description = "A performance test for loading Prisma's library engine";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { inherit system; };

      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [ nodejs ];

          nativeBuildInputs = with pkgs; [
            nodejs.pkgs.prettier
            nodejs.pkgs.typescript-language-server
            nodejs.pkgs.vscode-langservers-extracted

            python311
            python311Packages.jupyter
            python311Packages.matplotlib
            python311Packages.numpy
          ];
        };

        packages = { };
      });
}
