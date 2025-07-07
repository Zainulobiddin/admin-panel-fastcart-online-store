import { useSubcategories } from "@/store/subcategories/subcategories";
import { useEffect, useState } from "react";
import { Fragment } from "react";
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
import { useCategories } from "@/store/categories/categories";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Subcategories() {
  const {
    subCategories,
    getSubCategories,
    deleteSubcategories,
    addSubCategories,
    editSubCategories,
  } = useSubcategories();
  const [open, setOpen] = useState(false);
  const { categories, getCategories } = useCategories();
  const [selectSub, setSelectSub] = useState("");
  const [subName, setSubName] = useState("");
  const [subNameEdit, setSubNameEdit] = useState("");
  const [idx, setIdx] = useState(null);
  const [findCategoryID, setFindCategoryID] = useState(null);

  function handleSub(e) {
    setSelectSub(e.target.value);
  }

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  function handleEdit(sub) {
    categories.find((category) =>
      category?.subCategories.find((el) =>
        el.id === sub.id ? setFindCategoryID(category.id) : null
      )
    );
    console.log("find = ", findCategoryID);
    handleClickOpen();
    setSubNameEdit(sub.subCategoryName);
    setIdx(sub.id);
  }

  function handleSaveEdit() {
    editSubCategories(idx, findCategoryID, subNameEdit);
    console.log(idx, findCategoryID, subNameEdit);
    setOpen(false);
  }

  function handleAddBrand() {
    addSubCategories(selectSub, subName);
  }

  // useEffect()

  useEffect(() => {
    getSubCategories();
    getCategories();
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
            className="py-2 px-4 rounded-[4px] hover:bg-[#DBEAFE] hover:text-[#1D4ED8] "
            to={"/brands"}
          >
            Brands
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-2 px-4 rounded-[4px] bg-[#DBEAFE] text-[#1D4ED8]"
                : "py-2 px-4 rounded-[4px] hover:bg-[#DBEAFE] hover:text-[#1D4ED8]"
            }
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
                <TableCell align="start">Subcategories</TableCell>
                <TableCell align="start">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategories.map((sub) => (
                <TableRow
                  key={sub.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="start" component="th" scope="row">
                    {sub.subCategoryName}
                  </TableCell>
                  <TableCell align="start">
                    <Box className="flex gap-3">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(sub)}
                      >
                        <BorderColorIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => deleteSubcategories(sub.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* edit modal */}
          <Fragment>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Edit subcategory"}
              </DialogTitle>
              <DialogContent className="w-[500px] ">
                <form className="flex flex-col gap-6 ">
                  <TextField
                    label="Subcategory name"
                    value={subNameEdit}
                    className="w-full"
                    onChange={({ target }) => setSubNameEdit(target.value)}
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

        <div className="border border-[#E5E5E5] rounded-[4px] w-[50%] h-[328px] flex flex-col gap-6 p-7">
          <div className="flex flex-col gap-6">
            <Typography variant="h5">Add new subcategory</Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectSub}
                  label="Category"
                  onChange={handleSub}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              label="Subcategory name"
              value={subName}
              onChange={({ target }) => setSubName(target.value)}
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
