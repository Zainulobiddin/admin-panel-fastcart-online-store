  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';



export default function TopProducts() {

const rows = [
{name: 'Men Grey Hoodie', price: '$49.90', units: '204'},
{name: 'Women Striped T-Shirt', price: '$49.90', units: '155'},
{name: 'Wome White T-Shirt', price: '$49.90', units: '104'},
{name: 'Wome White T-Shirt', price: '$49.90', units: '234'},
{name: 'Wome White T-Shirt', price: '$49.90', units: '204'},
];

  return (
    <div className='p-5 flex flex-col gap-2 border border-[#00000014] rounded-[4px]'>
      <h2>Top Products by Units Sold</h2>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="start">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Inits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="start">
                    {row.name}
              </TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.units}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
