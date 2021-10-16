# Unity Cloud Build Viewer VSCode extension

This extension is for viewing Unity Cloud Build build logs in much stress-free way.

# Features

* Browse latest builds on `Unity Cloud Build` explorer view.
* Show build details.
* Load build logs progressively.
  * Can be launched from build detail view, or context menu of the `Unity Cloud Build` explorer view.

# Setup

`Api Key` setting in the `Unity Cloud Build Viewer` section must be set before using this plugin. The correct value can be found on the official `Unity Cloud Build` dashboard's `Settings` screen.

After that, push `Ctrl+P` to show the command palette and select `'Unity Cloud Build Viewer: setup'` command.
If the api key was correct, you can choose a target project from existing projects.
Then, `Unity Cloud Build` explorer view will work and it will show the latest builds.

# License

MIT


## Release Notes

* Version 0.0.1
  * initial release

* Version 0.0.2
  * fix setup failure

* Version 0.0.3
  * added 'build again'
  * implemented build filter
  * added branch and commit info on build detail view

