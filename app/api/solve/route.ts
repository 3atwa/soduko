import { type NextRequest, NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"
import fs from "fs"

export async function POST(request: NextRequest) {
  try {
    const { grid, algorithm } = await request.json()

    // Validate input
    if (!grid || !algorithm) {
      return NextResponse.json({ error: "Missing grid or algorithm parameter" }, { status: 400 })
    }

    if (!Array.isArray(grid) || grid.length !== 9) {
      return NextResponse.json({ error: "Invalid grid format" }, { status: 400 })
    }

    // Check if Python files exist
    const algorithmsDir = path.join(process.cwd(), "algorithms")
    const solverApiPath = path.join(algorithmsDir, "solver_api.py")

    if (!fs.existsSync(solverApiPath)) {
      console.log("Python files not found, using fallback simulation")
    }

    try {
      // Try to execute Python script
      const result = await executePythonScript(solverApiPath, {
        grid,
        algorithm,
        beam_width: algorithm === "beam" ? 5 : undefined,
      })
      return NextResponse.json(result)
    } catch (pythonError) {
      console.log("Python execution failed, using fallback:", pythonError)
      // Fallback to simulation
    }
  } catch (error) {
    console.error("Error in solve API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function executePythonScript(scriptPath: string, inputData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    // Try different Python commands
    const pythonCommands = ["python3", "python", "py"]
    let currentCommandIndex = 0

    function tryNextCommand() {
      if (currentCommandIndex >= pythonCommands.length) {
        reject(new Error("No working Python interpreter found"))
        return
      }

      const pythonCmd = pythonCommands[currentCommandIndex]
      const python = spawn(pythonCmd, [scriptPath])

      let stdout = ""
      let stderr = ""

      python.stdout.on("data", (data) => {
        stdout += data.toString()
      })

      python.stderr.on("data", (data) => {
        stderr += data.toString()
      })

      python.on("close", (code) => {
        if (code !== 0) {
          currentCommandIndex++
          tryNextCommand()
          return
        }

        try {
          const result = JSON.parse(stdout)
          resolve(result)
        } catch (error) {
          reject(new Error(`Failed to parse Python output: ${stdout}`))
        }
      })

      python.on("error", (error) => {
        currentCommandIndex++
        tryNextCommand()
      })

      // Send input data to Python script
      python.stdin.write(JSON.stringify(inputData))
      python.stdin.end()
    }

    tryNextCommand()
  })
}


