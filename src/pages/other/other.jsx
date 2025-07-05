import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useCategories } from "@/store/categories/categories";
import { Fragment, useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const Other = () => {
  const { categories, getCategories } = useCategories();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // function baroi ba formati base64 bargardondan ast:
  // function handleBase64(e) {

  // }



  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex justify-between items-center">
        <ul className="flex gap-2">
          <NavLink to={"/other"}>Categories</NavLink>
          <NavLink to={"/brands"}>Brands</NavLink>
          <NavLink>Subcategories</NavLink>
        </ul>
        <Button variant="contained" onClick={handleClickOpen}>
          + Add new
        </Button>
      </header>

      <section>
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
      </section>

      <section className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex rounded-[4px] items-start justify-between px-5 pt-6 border border-[#0000004D] w-[182px] h-[144px]"
          >
            <div className="flex flex-col gap-4">
              <img
                className="w-[50px] h-[50px]"
                src={`http://37.27.29.18:8002/images/${category.categoryImage}`}
                alt=""
              />
              <p>{category.categoryName}</p>
            </div>
            <IconButton color="primary">
              <BorderColorIcon />
            </IconButton>
          </div>
        ))}
      </section>
      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          
        >
          <DialogTitle id="alert-dialog-title">{"Add category"}</DialogTitle>
          <DialogContent className="w-[500px] flex flex-col gap-6 ">
            
            <TextField label="Category name" />
            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-gray-300 rounded-md px-6 py-10 flex flex-col items-center justify-center cursor-pointer text-center hover:bg-gray-50 transition"
            >
              <svg
                className="w-10 h-10 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l8-8m0 0l8 8m-8-8v16"
                />
              </svg>
              <p className="text-sm font-medium text-blue-600">
                Click to upload
              </p>
              <p className="text-xs text-gray-500">or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">
                (SVG, JPG, PNG, or GIF max 900x400)
              </p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleBase64}
              />
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} autoFocus variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default Other;
