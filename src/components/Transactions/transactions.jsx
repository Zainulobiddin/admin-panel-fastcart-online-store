  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';

export default function Transactions() {

    const rows = [
{name: 'Jagarnath S.', date: '24.05.2023', amount: '$124.97', status: 'Paid'},
{name: 'Jagarnath S.', date: '24.05.2023', amount: '$124.97', status: 'Paid'},
{name: 'Jagarnath S.', date: '24.05.2023', amount: '$124.97', status: 'Paid'},
{name: 'Jagarnath S.', date: '24.05.2023', amount: '$124.97', status: 'Paid'},
{name: 'Jagarnath S.', date: '24.05.2023', amount: '$124.97', status: 'Paid'},
];

  return (
    <div className='p-5 flex flex-col gap-2 border border-[#00000014] rounded-[4px] '>
      <h2>Recent Transactions</h2>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.status ? 'Paid' : 'Pending'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
