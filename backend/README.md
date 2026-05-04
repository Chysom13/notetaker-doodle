# FastAPI Setup Guide Using `uv`

This backend is built with FastAPI and uses astral's [`uv`](https://github.com/astral-sh/uv) as the package manager and dependency resolver. `uv` is an extremely fast Python package and project manager written in Rust.

Below is a guide on how this environment was set up and how you can manage dependencies and run the application using `uv`.

## 1. Initializing a Project with `uv`

If you were starting from scratch, you would initialize a new project by running:
```bash
# Initialize a new python project
uv init

# This generates:
# - pyproject.toml (for defining dependencies)
# - .python-version (specifying the python version)
# - README.md
```

## 2. Managing Dependencies

Unlike `pip` where you manually manage a `requirements.txt` and a virtual environment, `uv` automatically manages a hidden `.venv` directory for you.

To install the required packages for this FastAPI application, you run:
```bash
uv add fastapi
uv add "uvicorn[standard]"
uv add sqlalchemy
```

Behind the scenes, `uv`:
1. Automatically creates the `.venv` if it doesn't exist.
2. Resolves and downloads the dependencies extremely quickly.
3. Updates your `pyproject.toml` and generates a `uv.lock` file to freeze exact dependency versions for reproducible builds.

## 3. Running the FastAPI Server

Because `uv` manages the virtual environment, you do **not** need to run `source .venv/bin/activate` or `.\.venv\Scripts\activate`. 

Instead, you prefix your commands with `uv run`. This automatically executes the command inside the isolated virtual environment.

To start the FastAPI development server, run:
```bash
uv run uvicorn app.main:app --reload
```

- `app.main:app` points to the `app` instance inside `app/main.py`.
- `--reload` tells Uvicorn to restart the server automatically when you make code changes.
- The server will default to running on `http://localhost:8000`.

## 4. Useful `uv` Commands

- **Sync Environment**: If you clone this repository on a new machine, simply run:
  ```bash
  uv sync
  ```
  This will read the `uv.lock` file and create an exact replica of the environment.

- **Run Python Scripts**: 
  ```bash
  uv run python script.py
  ```

- **Remove a dependency**:
  ```bash
  uv remove package-name
  ```

Using `uv` provides a modern, blazing-fast, and reproducible workflow for Python API development!
