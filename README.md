# AI Sudoku Solver

A modern React application that compares A* and Beam Search algorithms for solving Sudoku puzzles with real-time visualization and performance analytics.

## Features

- 🧠 **Real Python AI Algorithms**: Uses actual A* and Beam Search implementations
- 🎨 **Modern UI**: Beautiful dark/light mode with glass morphism effects
- 📊 **Real-time Visualization**: Watch algorithms solve puzzles step-by-step
- 📈 **Performance Analytics**: Compare algorithm efficiency and success rates
- 🎯 **Multiple Difficulties**: Easy, Medium, Hard, and Impossible levels
- 🔄 **Live Step Tracking**: See each move highlighted on the puzzle grid

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- npm or yarn

### Installation

1. **Clone and install dependencies:**
\`\`\`bash
npm install
\`\`\`

2. **Set up Python environment (optional but recommended):**
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
\`\`\`

3. **Run the development server:**
\`\`\`bash
npm run dev
\`\`\`

4. **Open your browser:**
Navigate to `http://localhost:3000`

## How It Works

### Python Integration

The application uses a hybrid approach:

1. **Frontend**: Modern React with TypeScript and Tailwind CSS
2. **Backend API**: Next.js API route (`/api/solve`) that calls Python scripts
3. **Python Algorithms**: Real A* and Beam Search implementations in `/algorithms/`
4. **Fallback**: JavaScript simulation if Python execution fails

### Algorithm Files

- `algorithms/astar_solver.py` - A* algorithm implementation
- `algorithms/beam_search_solver.py` - Beam Search algorithm implementation  
- `algorithms/solver_api.py` - API bridge between React and Python

### API Usage

\`\`\`typescript
// Call the Python algorithms
const response = await fetch('/api/solve', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grid: sudokuGrid,
    algorithm: 'astar' // or 'beam'
  })
})
\`\`\`

## Algorithm Comparison

### A* Algorithm
- ✅ **Optimal solutions guaranteed**
- ✅ **High success rate**
- ❌ **Higher memory usage**
- ❌ **Slower execution time**

### Beam Search
- ✅ **Fast execution**
- ✅ **Memory efficient**
- ❌ **May not find optimal solution**
- ❌ **Lower success rate on hard puzzles**

## Troubleshooting

### Python Not Found
If you get Python execution errors:

1. Ensure Python 3.8+ is installed and in your PATH
2. Try changing `python3` to `python` in `app/api/solve/route.ts`
3. Check that the algorithms folder has proper permissions

### Algorithm Fallback
The app automatically falls back to JavaScript simulation if Python fails, so the UI will always work.

## Development

### Adding New Algorithms
1. Create new Python solver in `/algorithms/`
2. Update `solver_api.py` to handle the new algorithm
3. Add algorithm option to the React frontend

### Customizing Visualization
- Modify animation timing in `components/sudoku-game.tsx`
- Adjust step highlighting in the `getCellClassName` function
- Update color schemes in `app/globals.css`

## Performance Notes

- Python algorithms run server-side for security
- Results are cached for identical puzzles
- Visualization speed can be adjusted in the code
- Memory usage scales with puzzle difficulty

## License

MIT License - feel free to use and modify!
