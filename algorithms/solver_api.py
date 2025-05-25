#!/usr/bin/env python3
import sys
import json
import traceback
from astar_solver import AStarSolver
from beam_search_solver import BeamSearchSolver

def main():
    try:
        # Read input from stdin
        input_data = sys.stdin.read()
        data = json.loads(input_data)
        
        grid = data['grid']
        algorithm = data['algorithm']
        beam_width = data.get('beam_width', 5)
        
        # Validate grid
        if not isinstance(grid, list) or len(grid) != 9:
            raise ValueError("Invalid grid format")
        
        for row in grid:
            if not isinstance(row, list) or len(row) != 9:
                raise ValueError("Invalid grid format")
            for cell in row:
                if not isinstance(cell, int) or cell < 0 or cell > 9:
                    raise ValueError("Invalid cell value")
        
        # Solve using the specified algorithm
        if algorithm == 'astar':
            solver = AStarSolver()
            success, solution, steps = solver.solve(grid)
            
            result = {
                'success': success,
                'solution': solution,
                'steps': steps,
                'nodesExplored': solver.nodes_explored,
                'algorithm': 'astar'
            }
        elif algorithm == 'beam':
            solver = BeamSearchSolver(beam_width=beam_width)
            success, solution, steps = solver.solve(grid)
            
            result = {
                'success': success,
                'solution': solution,
                'steps': steps,
                'nodesExplored': solver.nodes_explored,
                'algorithm': 'beam',
                'beamWidth': beam_width
            }
        else:
            raise ValueError(f"Unknown algorithm: {algorithm}")
        
        # Output result as JSON
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc()
        }
        print(json.dumps(error_result))
        sys.exit(1)

if __name__ == '__main__':
    main()
