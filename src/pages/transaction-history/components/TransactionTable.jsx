import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionTable = ({ 
  transactions, 
  onEdit, 
  onDelete, 
  selectedTransactions, 
  onSelectTransaction, 
  onSelectAll,
  sortConfig,
  onSort
}) => {
  const getTransactionIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'buy':
        return 'ArrowDownLeft';
      case 'sell':
        return 'ArrowUpRight';
      case 'transfer':
        return 'ArrowLeftRight';
      default:
        return 'ArrowLeftRight';
    }
  };

  const getTransactionColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'buy':
        return 'text-success';
      case 'sell':
        return 'text-error';
      case 'transfer':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDateTime = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return 'ArrowUpDown';
    }
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const allSelected = transactions?.length > 0 && selectedTransactions?.length === transactions?.length;
  const someSelected = selectedTransactions?.length > 0 && selectedTransactions?.length < transactions?.length;

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                Type
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                <button
                  onClick={() => onSort('cryptocurrency')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Asset</span>
                  <Icon name={getSortIcon('cryptocurrency')} size={14} />
                </button>
              </th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                <button
                  onClick={() => onSort('quantity')}
                  className="flex items-center justify-end space-x-1 hover:text-primary transition-smooth w-full"
                >
                  <span>Quantity</span>
                  <Icon name={getSortIcon('quantity')} size={14} />
                </button>
              </th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                <button
                  onClick={() => onSort('price')}
                  className="flex items-center justify-end space-x-1 hover:text-primary transition-smooth w-full"
                >
                  <span>Price</span>
                  <Icon name={getSortIcon('price')} size={14} />
                </button>
              </th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                <button
                  onClick={() => onSort('totalValue')}
                  className="flex items-center justify-end space-x-1 hover:text-primary transition-smooth w-full"
                >
                  <span>Total</span>
                  <Icon name={getSortIcon('totalValue')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                <button
                  onClick={() => onSort('date')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Date</span>
                  <Icon name={getSortIcon('date')} size={14} />
                </button>
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-foreground w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions?.map((transaction) => (
              <tr
                key={transaction?.id}
                className={`hover:bg-muted/30 transition-smooth ${
                  selectedTransactions?.includes(transaction?.id) ? 'bg-primary/5' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedTransactions?.includes(transaction?.id)}
                    onChange={(e) => onSelectTransaction(transaction?.id, e?.target?.checked)}
                    className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded-lg bg-muted ${getTransactionColor(transaction?.type)}`}>
                      <Icon name={getTransactionIcon(transaction?.type)} size={16} />
                    </div>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {transaction?.type}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {transaction?.cryptocurrency}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction?.symbol}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-mono text-foreground">
                    {transaction?.quantity}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-mono text-foreground">
                    ${transaction?.price?.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div>
                    <p className="text-sm font-mono font-semibold text-foreground">
                      ${transaction?.totalValue?.toLocaleString()}
                    </p>
                    {transaction?.fees > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Fee: ${transaction?.fees?.toFixed(2)}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">
                    {formatDateTime(transaction?.date)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(transaction)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(transaction?.id)}
                      className="h-8 w-8 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;