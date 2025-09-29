import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedCount, onExport, onDelete, onClearSelection }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExport(format);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-30">
        <div className="bg-card border rounded-lg shadow-elevation-2 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Icon name="CheckSquare" size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {selectedCount} transaction{selectedCount !== 1 ? 's' : ''} selected
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Export Dropdown */}
              <div className="relative group">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isExporting}
                  className="flex items-center space-x-2"
                >
                  {isExporting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  ) : (
                    <Icon name="Download" size={16} />
                  )}
                  <span>Export</span>
                  <Icon name="ChevronDown" size={14} />
                </Button>

                <div className="absolute bottom-full left-0 mb-2 w-48 bg-popover border rounded-lg shadow-elevation-2 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => handleExport('csv')}
                    className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="FileText" size={16} className="mr-2" />
                    Export as CSV
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="FileText" size={16} className="mr-2" />
                    Export as PDF
                  </button>
                  <button
                    onClick={() => handleExport('excel')}
                    className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="FileSpreadsheet" size={16} className="mr-2" />
                    Export as Excel
                  </button>
                </div>
              </div>

              {/* Delete Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-error hover:text-error border-error/20 hover:border-error/40"
              >
                <Icon name="Trash2" size={16} />
                <span className="ml-2">Delete</span>
              </Button>

              {/* Clear Selection */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg shadow-elevation-3 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 p-2 bg-error/10 rounded-lg">
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Delete Transactions</h3>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete {selectedCount} transaction{selectedCount !== 1 ? 's' : ''}?
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 mb-4">
                <p className="text-sm text-muted-foreground">
                  <Icon name="Info" size={16} className="inline mr-1" />
                  This action cannot be undone. The selected transactions will be permanently removed from your history.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex-1"
                >
                  Delete {selectedCount} Transaction{selectedCount !== 1 ? 's' : ''}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;