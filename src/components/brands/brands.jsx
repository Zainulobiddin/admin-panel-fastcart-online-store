import { useBrands } from "@/store/brands/brands";
import { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";

export default function Brands() {
  const {
    brands,
    getBrands,
    addBrands,
    deleteBrand,
    editBrand,
    getBrandByID,
    brandById,
  } = useBrands();
  const [brandName, setBrandName] = useState("");
  const [brandNameEdit, setBrandNameEdit] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };
  function handleAddBrand() {
    addBrands(brandName);
  }

  function handleEdit(id) {
    handleClickOpen();
    getBrandByID(id);
    setBrandNameEdit(brandById.brandName);
    console.log("name = ", brandById.brandName);
  }

  function handleSaveEdit() {
    editBrand(brandById.id, brandNameEdit);
    setOpen(false);
  }

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <header className="flex justify-between items-center py-8">
        <ul className="flex gap-2">
          <NavLink
            className="py-2 px-4 rounded-[4px] hover:bg-[#DBEAFE] hover:text-[#1D4ED8] "
            to={"/other"}
          >
            Categories
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-2 px-4 rounded-[4px] bg-[#DBEAFE] text-[#1D4ED8]"
                : "py-2 px-4 rounded-[4px] hover:bg-[#DBEAFE] hover:text-[#1D4ED8]"
            }
            to={"/brands"}
          >
            Brands
          </NavLink>
          <NavLink
            className="py-2 px-4 rounded-[4px] hover:bg-[#DBEAFE] hover:text-[#1D4ED8] "
            to={"/subcategories"}
          >
            Subcategories
          </NavLink>
        </ul>
      </header>

      <div className="flex gap-10">
        <TableContainer component={Paper} sx={{ width: "50%" }}>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="start">Brands</TableCell>
                <TableCell align="start">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands.map((brand) => (
                <TableRow
                  key={brand.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="start" component="th" scope="row">
                    {brand.brandName}
                  </TableCell>
                  <TableCell align="start">
                    <Box className="flex gap-3">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(brand.id)}
                      >
                        <BorderColorIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => deleteBrand(brand.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* add modal */}
          <Fragment>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Edit brand"}</DialogTitle>
              <DialogContent className="w-[500px] ">
                <form className="flex flex-col gap-6 ">
                  <TextField
                    label="Brand name"
                    value={brandNameEdit}
                    className="w-full"
                    onChange={({ target }) => setBrandNameEdit(target.value)}
                  />

                  <DialogActions>
                    <Button
                      type="reset"
                      variant="outlined"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      autoFocus
                      variant="contained"
                      onClick={handleSaveEdit}
                    >
                      Create
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          </Fragment>
        </TableContainer>

        <div className="border border-[#E5E5E5] rounded-[4px] w-[50%] h-[228px] flex flex-col gap-6 p-7">
          <div className="flex flex-col gap-6">
            <Typography variant="h5">Add new brand</Typography>
            <TextField
              label="Brand name"
              value={brandName}
              onChange={({ target }) => setBrandName(target.value)}
            />
          </div>
          <Button variant="contained" onClick={handleAddBrand}>
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
