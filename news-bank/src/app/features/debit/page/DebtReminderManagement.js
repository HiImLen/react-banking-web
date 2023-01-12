import { MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'

const columns = [
  { id: 'name', label: 'Name/Business', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2)
  }
]

const rows = [
  ('India', 'IN', 1324171354, 3287263, 1212),
  ('China', 'CN', 1403500365, 9596961, 212)
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767)
]

export default function DebtReminderManagement () {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
            <Paper
                className='flex flex-col gap-y-4 py-4 px-5'
                elevation={3}
                sx={{ borderRadius: '10px' }}
            >
                <Typography className='text-black text-left'>Date</Typography>
                <Select className='w-min' labelId="form-paid-fee-label" defaultValue={30}>
                    <MenuItem value={7}>Last 7 days</MenuItem>
                    <MenuItem value={15}>Last 15 days</MenuItem>
                    <MenuItem value={30}>Last 30 days</MenuItem>
                </Select>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ height: 400 }}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                      const value = row[column.id]
                                      return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                          ? column.format(value)
                                          : value}
                                        </TableCell>
                                      )
                                    })}
                                </TableRow>
                                )
                              })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Paper>
  )
}
