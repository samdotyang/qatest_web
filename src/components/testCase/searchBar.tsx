type TestCaseSearchBarProps = {
    caseId: string;
    onInputChange: (value: string) => void;
    onButtonClick: (caseId: string) => void;
}


const TestCaseSearchBar = ( { caseId, onInputChange, onButtonClick }: TestCaseSearchBarProps ) => {
    const _handleKeyDown = ( event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onButtonClick(caseId);
        }
    }
    return (
        <div className="shrink-0 bg-card rounded-lg p-4 text-primary-label">
          <div className="flex shrink-0">
            <input
              type="text"
              className="p-2 border border-gray-300 bg-transparent rounded-lg w-full mr-4"
              placeholder="Enter test case ID"
              value={caseId}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => _handleKeyDown(e)}
            />
            <button
              className="p-2 bg-blue rounded-lg ml-auto mr-0 text-white"
              onClick={() => onButtonClick(caseId)}
            >
              Show
            </button>
          </div>
        </div>
    )
}

export default TestCaseSearchBar