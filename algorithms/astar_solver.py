import heapq
import time
from typing import List, Tuple, Optional, Set
import copy

class SudokuState:
    def __init__(self, grid: List[List[int]], parent=None, move=None):
        self.grid = grid
        self.parent = parent
        self.move = move  # (row, col, value)
        self.g_cost = 0 if parent is None else parent.g_cost + 1
        self.h_cost = self.calculate_heuristic()
        self.f_cost = self.g_cost + self.h_cost
        
    def calculate_heuristic(self) -> int:
        """Calculate heuristic: number of empty cells + constraint violations"""
        empty_cells = 0
        violations = 0
        
        for i in range(9):
            for j in range(9):
                if self.grid[i][j] == 0:
                    empty_cells += 1
                    # Add constraint violations for this empty cell
                    violations += self.count_possible_values(i, j)
        
        return empty_cells + violations

    def count_possible_values(self, row: int, col: int) -> int:
        """Count how many values are possible for this cell"""
        if self.grid[row][col] != 0:
            return 0
            
        possible = set(range(1, 10))
        
        # Remove values in same row
        for c in range(9):
            if self.grid[row][c] in possible:
                possible.remove(self.grid[row][c])
        
        # Remove values in same column
        for r in range(9):
            if self.grid[r][col] in possible:
                possible.remove(self.grid[r][col])
        
        # Remove values in same 3x3 box
        box_row, box_col = 3 * (row // 3), 3 * (col // 3)
        for r in range(box_row, box_row + 3):
            for c in range(box_col, box_col + 3):
                if self.grid[r][c] in possible:
                    possible.remove(self.grid[r][c])
        
        return 9 - len(possible)  # Higher cost for fewer possibilities

    def is_valid_move(self, row: int, col: int, num: int) -> bool:
        """Check if placing num at (row, col) is valid"""
        # Check row
        for c in range(9):
            if self.grid[row][c] == num:
                return False
        
        # Check column
        for r in range(9):
            if self.grid[r][col] == num:
                return False
        
        # Check 3x3 box
        box_row, box_col = 3 * (row // 3), 3 * (col // 3)
        for r in range(box_row, box_row + 3):
            for c in range(box_col, box_col + 3):
                if self.grid[r][c] == num:
                    return False
        
        return True

    def get_next_empty_cell(self) -> Optional[Tuple[int, int]]:
        """Find the next empty cell with minimum remaining values (MRV heuristic)"""
        min_possibilities = 10
        best_cell = None
        
        for i in range(9):
            for j in range(9):
                if self.grid[i][j] == 0:
                    possibilities = self.get_possible_values(i, j)
                    if len(possibilities) < min_possibilities:
                        min_possibilities = len(possibilities)
                        best_cell = (i, j)
                        if min_possibilities == 1:  # Can't get better than this
                            return best_cell
        
        return best_cell

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

    def is_complete(self) -> bool:
        """Check if the puzzle is completely solved"""
        for row in self.grid:
            if 0 in row:
                return False
        return True

    def get_successors(self) -> List['SudokuState']:
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
            successor = SudokuState(new_grid, self, (row, col, value))
            successors.append(successor)
        
        return successors

    def __lt__(self, other):
        return self.f_cost < other.f_cost

    def __eq__(self, other):
        return self.grid == other.grid

    def __hash__(self):
        return hash(str(self.grid))

class AStarSolver:
    def __init__(self):
        self.nodes_explored = 0
        self.steps = []
        
    def solve(self, initial_grid: List[List[int]]) -> Tuple[bool, List[List[int]], List[dict]]:
        """Solve Sudoku using A* algorithm"""
        self.nodes_explored = 0
        self.steps = []
        
        start_time = time.time()
        initial_state = SudokuState(initial_grid)
        
        if initial_state.is_complete():
            return True, initial_grid, []
        
        open_set = [initial_state]
        closed_set = set()
        
        while open_set:
            current_state = heapq.heappop(open_set)
            self.nodes_explored += 1
            
            if str(current_state.grid) in closed_set:
                continue
                
            closed_set.add(str(current_state.grid))
            
            # Record step
            if current_state.move:
                row, col, value = current_state.move
                self.steps.append({
                    'step': len(self.steps) + 1,
                    'position': [row, col],
                    'value': value,
                    'nodesExplored': self.nodes_explored,
                    'heuristic': current_state.h_cost,
                    'f_cost': current_state.f_cost
                })
            
            if current_state.is_complete():
                return True, current_state.grid, self.steps
            
            # Generate successors
            successors = current_state.get_successors()
            
            for successor in successors:
                if str(successor.grid) not in closed_set:
                    heapq.heappush(open_set, successor)
        
        return False, initial_grid, self.steps
