/**
 * Table Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Table | framingui',
  description: 'Display tabular data with flexible table components.',
};

export default function TablePage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Table</h1>
        <p className="text-xl text-neutral-600">
          Display structured data in rows and columns with semantic HTML table elements.
        </p>
      </header>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          {`import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@framingui/ui';`}
        </pre>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice Johnson</TableCell>
      <TableCell>alice@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bob Smith</TableCell>
      <TableCell>bob@example.com</TableCell>
      <TableCell>User</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        </pre>
      </section>

      {/* With Caption */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Caption</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Table>
  <TableCaption>A list of recent invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        </pre>
      </section>

      {/* With Footer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Footer</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Product</TableHead>
      <TableHead>Quantity</TableHead>
      <TableHead className="text-right">Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Widget A</TableCell>
      <TableCell>5</TableCell>
      <TableCell className="text-right">$50.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Widget B</TableCell>
      <TableCell>3</TableCell>
      <TableCell className="text-right">$75.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell className="text-right">$125.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
        </pre>
      </section>

      {/* Aligned Columns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Column Alignment</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Item</TableHead>
      <TableHead className="text-center">Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Product 1</TableCell>
      <TableCell className="text-center">Active</TableCell>
      <TableCell className="text-right">$99.99</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        </pre>
      </section>

      {/* Selectable Rows */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Selectable Rows</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { Checkbox } from '@framingui/ui';

function SelectableTable() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state={selected.includes('1') ? 'selected' : undefined}>
          <TableCell>
            <Checkbox
              checked={selected.includes('1')}
              onCheckedChange={() => toggleRow('1')}
            />
          </TableCell>
          <TableCell>Alice</TableCell>
          <TableCell>alice@example.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`}
        </pre>
      </section>

      {/* Sortable Headers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Sortable Headers</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

function SortableTable() {
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button
              onClick={() => handleSort('name')}
              className="flex items-center gap-2 hover:text-neutral-900"
            >
              Name
              {sortKey === 'name' ? (
                sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4" />
              )}
            </button>
          </TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}`}
        </pre>
      </section>

      {/* Striped Rows */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Striped Rows</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="even:bg-neutral-50">
      <TableCell>Row 1</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
    <TableRow className="even:bg-neutral-50">
      <TableCell>Row 2</TableCell>
      <TableCell>Inactive</TableCell>
    </TableRow>
    <TableRow className="even:bg-neutral-50">
      <TableCell>Row 3</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        </pre>
      </section>

      {/* Loading State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Loading State</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { Loader2 } from 'lucide-react';

function LoadingTable({ isLoading }: { isLoading: boolean }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            </TableCell>
          </TableRow>
        ) : (
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>alice@example.com</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}`}
        </pre>
      </section>

      {/* Empty State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Empty State</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`function EmptyTable({ data }: { data: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center text-neutral-500">
              No data available
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}`}
        </pre>
      </section>

      {/* Real World Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Real World Examples</h2>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">User Management Table</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { Button, Badge } from '@framingui/ui';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

function UserTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant="outline">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">
          Invoice Table with Pagination
        </h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { Button } from '@framingui/ui';

function InvoiceTable({ invoices, page, totalPages, onPageChange }) {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-mono">{invoice.id}</TableCell>
              <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
              <TableCell>{invoice.customer}</TableCell>
              <TableCell className="text-right font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(invoice.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              Page {page} of {totalPages}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => onPageChange(page - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => onPageChange(page + 1)}
                >
                  Next
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Product Comparison Table</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { Check, X } from 'lucide-react';

function ProductComparison() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          <TableHead className="text-center">Basic</TableHead>
          <TableHead className="text-center">Pro</TableHead>
          <TableHead className="text-center">Enterprise</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Users</TableCell>
          <TableCell className="text-center">Up to 5</TableCell>
          <TableCell className="text-center">Up to 50</TableCell>
          <TableCell className="text-center">Unlimited</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Storage</TableCell>
          <TableCell className="text-center">10 GB</TableCell>
          <TableCell className="text-center">100 GB</TableCell>
          <TableCell className="text-center">1 TB</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">API Access</TableCell>
          <TableCell className="text-center">
            <X className="w-4 h-4 mx-auto text-neutral-400" />
          </TableCell>
          <TableCell className="text-center">
            <Check className="w-4 h-4 mx-auto text-green-600" />
          </TableCell>
          <TableCell className="text-center">
            <Check className="w-4 h-4 mx-auto text-green-600" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">24/7 Support</TableCell>
          <TableCell className="text-center">
            <X className="w-4 h-4 mx-auto text-neutral-400" />
          </TableCell>
          <TableCell className="text-center">
            <X className="w-4 h-4 mx-auto text-neutral-400" />
          </TableCell>
          <TableCell className="text-center">
            <Check className="w-4 h-4 mx-auto text-green-600" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`}
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Props</h2>
        <p className="text-neutral-600">
          All table components accept standard HTML table element props.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 pr-4 font-semibold">Component</th>
                <th className="text-left py-3 pr-4 font-semibold">HTML Element</th>
                <th className="text-left py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">Table</td>
                <td className="py-3 pr-4 font-mono text-sm">table</td>
                <td className="py-3">Main table wrapper with overflow handling</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">TableHeader</td>
                <td className="py-3 pr-4 font-mono text-sm">thead</td>
                <td className="py-3">Table header section</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">TableBody</td>
                <td className="py-3 pr-4 font-mono text-sm">tbody</td>
                <td className="py-3">Table body section</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">TableFooter</td>
                <td className="py-3 pr-4 font-mono text-sm">tfoot</td>
                <td className="py-3">Table footer section with summary data</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">TableRow</td>
                <td className="py-3 pr-4 font-mono text-sm">tr</td>
                <td className="py-3">Table row with hover and selection states</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">TableHead</td>
                <td className="py-3 pr-4 font-mono text-sm">th</td>
                <td className="py-3">Table header cell</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">TableCell</td>
                <td className="py-3 pr-4 font-mono text-sm">td</td>
                <td className="py-3">Table data cell</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">TableCaption</td>
                <td className="py-3 pr-4 font-mono text-sm">caption</td>
                <td className="py-3">Table caption for accessibility</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
