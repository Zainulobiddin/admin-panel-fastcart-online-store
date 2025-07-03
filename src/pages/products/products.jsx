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
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useProducts } from "@/store/products/products";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const { products, getProducts } = useProducts();

  console.log("products =", products);

  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "image", headerName: "Image", width: 100,
      renderCell: (params) => (
        <div className="flex items-center ">
        <img src={`http://37.27.29.18:8002/images/${params.value}`} alt="" className="w-[50px] h-[50px] rounded-[5px] " />
        </div>
      )
     },
    { field: "productName", headerName: "Product Name", width: 160 },
      {
      field: "quantity",
      headerName: "Inventory",
      width: 120,
      renderCell: (params) => (params.value > 0 ? `${params.value} in stock` : 'Out of Stock')
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
      renderCell: (params) => `$${params.value}`
    },
    {
      field: "categoryName",
      headerName: "Category",
      width: 150,
    },
  
    {
      field: "actions",
      headerName: 'Actions',
      width: 150,
      renderCell: () => (
        <Box>
            <IconButton color="primary">
              <BorderColorIcon/>
            </IconButton>
            <IconButton color="error">
              <DeleteIcon/>
            </IconButton>
        </Box>
      )
    }
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <div className="flex justify-between ">
        <h2 className="font-bold text-2xl text-[#111927]   ">Products</h2>
        <Link to={'/add-products'}>
        <Button variant="contained" className="font-medium  ">
          + Add products
        </Button>
        </Link>
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
                <MenuItem value={""}>Newest</MenuItem>
                <MenuItem value={""}>Newest</MenuItem>
                <MenuItem value={""}>Newest</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className="flex gap-3">
          <Box className="border border-[#E2E8F0] rounded-[4px] ">
            <IconButton color="primary">
              <BorderColorIcon />
            </IconButton>
          </Box>

          <Box className="border border-[#E2E8F0] rounded-[4px] ">
            <IconButton color="primary">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </div>

      <section>
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products || []}
            getRowId={(row) => row.id}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </section>
    </div>
  );
};

export default Products;
