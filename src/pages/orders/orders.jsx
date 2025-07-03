import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import TableMUI from "@/components/table-mui/table-mui";

const Orders = () => {
  return (
    <div>
      <div className="flex justify-between ">
        <h2 className="font-bold text-2xl text-[#111927]   ">Orders</h2>
        <Button variant="contained" className="font-medium  ">
          + Add order
        </Button>
      </div>

      <div className="flex justify-between items-center my-10 mb-6 ">
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          className="flex "
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={}
                label="Filter"
                // onChange={}
              >
                <MenuItem value={10}>Newest</MenuItem>
                <MenuItem value={20}>Newest</MenuItem>
                <MenuItem value={30}>Newest</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className='flex gap-3'>
          <Button variant="outlined">
            <IconButton color="primary">
              <BorderColorIcon />
            </IconButton>
          </Button>

          <Button variant="outlined">
            <IconButton color="primary">
              <DeleteIcon />
            </IconButton>
          </Button>
        </Box>
      </div>

      <section>
        <TableMUI/>
      </section>
    </div>
  );
};

export default Orders;
