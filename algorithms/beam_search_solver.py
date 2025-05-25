import copy
import time
from typing import List, Tuple, Set
import random

class BeamSearchState:
    def __init__(self, grid: List[List[int]], parent=None, move=None):
        self.grid = grid
        self.parent = parent
        self.move = move  # (row, col, value)
        self.score = self.calculate_score()
        
    def calculate_score(self) -> float:
        """Calculate state score (lower is better)"""
        empty_cells = 0
        constraint_violations = 0
        
        for i in range(9):
            for j in range(9):
                if self.grid[i][j] == 0:
                    empty_cells += 1
                    # Penalty for cells with fewer possibilities
                    possibilities = len(self.get_possible_values(i, j))
                    if possibilities == 0:
                        constraint_violations += 100  # Dead end penalty
                    else:
                        constraint_violations += (9 - possibilities)
        
        return empty_cells * 10 + constraint_violations

    def get_possible_values(self, row: int, col: int) -> Set[int]:
        """Get all possible values for a cell"""
        if self.grid[row][col] != 0:
            return set()
            
        possible = set(range(1, 10))
        
        # Remove values in same row
        for c in range(9):
            possible.discard(self.grid[row][c])
        
        # Remove values in same column
        for r in range(9):
            possible.discard(self.grid[r][col])
        
        # Remove values in same 3x3 box
        box_row, box_col = 3 * (row // 3), 3 * (col // 3)
        for r in range(box_row, box_row + 3):
            for c in range(box_col, box_col + 3):
                possible.discard(self.grid[r][c])
        
        return possible

    def get_next_empty_cell(self) -> Tuple[int, int]:
        """Find the next empty cell with minimum remaining values"""
        min_possibilities = 10
        best_cell = None
        
        for i in range(9):
            for j in range(9):
                if self.grid[i][j] == 0:
                    possibilities = len(self.get_possible_values(i, j))
                    if possibilities < min_possibilities:
                        min_possibilities = possibilities
                        best_cell = (i, j)
                        if min_possibilities == 1:
                            return best_cell
        
        return best_cell

    def is_complete(self) -> bool:
        """Check if the puzzle is completely solved"""
        for row in self.grid:
            if 0 in row:
                return False
        return True

    def is_valid(self) -> bool:
        """Check if current state is valid (no constraint violations)"""
        for i in range(9):
            for j in range(9):
                if self.grid[i][j] == 0:
                    if len(self.get_possible_values(i, j)) == 0:
                        return False
        return True

    def get_successors(self) -> List['BeamSearchState']:
        """Generate all valid successor states"""
        successors = []
        empty_cell = self.get_next_empty_cell()
        
        if empty_cell is None:
            return successors
        
        row, col = empty_cell
        possible_values = self.get_possible_values(row, col)
        
        for value in possible_values:
            new_grid = copy.deepcopy(self.grid)
            new_grid[row][col] = value
            successor = BeamSearchState(new_grid, self, (row, col, value))
            if successor.is_valid():
                successors.append(successor)
        
        return successors

class BeamSearchSolver:
    def __init__(self, beam_width: int = 5):
        self.beam_width = beam_width
        self.nodes_explored = 0
        self.steps = []
        
    def solve(self, initial_grid: List[List[int]]) -> Tuple[bool, List[List[int]], List[dict]]:
        """Solve Sudoku using Beam Search algorithm"""
        self.nodes_explored = 0
        self.steps = []
        
        start_time = time.time()
        initial_state = BeamSearchState(initial_grid)
        
        if initial_state.is_complete():
            return True, initial_grid, []
        
        current_beam = [initial_state]
        
        max_iterations = 1000  # Prevent infinite loops
        iteration = 0
        
        while current_beam and iteration < max_iterations:
            iteration += 1
            next_beam = []
            
            # Generate all successors from current beam
            for state in current_beam:
                if state.is_complete():
                    # Reconstruct solution path
                    self._reconstruct_path(state)
                    return True, state.grid, self.steps
                
                successors = state.get_successors()
                self.nodes_explored += len(successors)
                next_beam.extend(successors)
            
            if not next_beam:
                break
            
            # Sort by score and keep only the best beam_width states
            next_beam.sort(key=lambda x: x.score)
            current_beam = next_beam[:self.beam_width]
            
            # Record step for the best state
            if current_beam and current_beam[0].move:
                row, col, value = current_beam[0].move
                self.steps.append({
                    'step': len(self.steps) + 1,
                    'position': [row, col],
                    'value': value,
                    'nodesExplored': self.nodes_explored,
                    'beamWidth': self.beam_width,
                    'score': current_beam[0].score
                })
        
        # If we reach here, no solution was found
        best_state = min(current_beam, key=lambda x: x.score) if current_beam else initial_state
        return False, best_state.grid, self.steps

    def _reconstruct_path(self, final_state):
        """Reconstruct the solution path from final state"""
        path = []
        current = final_state
        
        while current.parent is not None:
            if current.move:
                path.append(current.move)
            current = current.parent
        
        path.reverse()
        
        # Convert path to steps format
        self.steps = []
        for i, (row, col, value) in enumerate(path):
            self.steps.append({
                'step': i + 1,
                'position': [row, col],
                'value': value,
                'nodesExplored': (i + 1) * self.beam_width,  # Estimate
                'beamWidth': self.beam_width,
                'score': 0  # Would need to recalculate
            })
