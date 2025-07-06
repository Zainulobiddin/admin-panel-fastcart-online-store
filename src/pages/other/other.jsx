import {
  Box,
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
import DeleteIcon from "@mui/icons-material/Delete";

const Other = () => {
  const {
    categories,
    getCategories,
    addCategories,
    deleteCategories,
    editCategories,
  } = useCategories();
  const [image, setImage] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameEdit, setCategoryNameEdit] = useState("");
  const [img, setImg] = useState(null);
  const [editId, setEditId] = useState(null);

  const handleClickOpen = () =>  setOpen(true);
  

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // function baroi ba formati base64 bargardondan ast:

  function handleBase64(e) {
    const files = Array.from(e.target.files);
    const previewImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previewImages.push({
          file: file,
          dataUrl: reader.result,
        });

        if (previewImages.length === files.length) {
          setImage(previewImages);
        }
      };

      reader.readAsDataURL(file);
    });
  }

  // function add categories

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("CategoryName", categoryName);
    image.forEach((img) => {
      formData.append("CategoryImage", img.file);
    });

    addCategories(formData);
    setOpen(false);
  }

  // function edit
  function handleEditCategories(category) {
    handleClickOpenEdit();
    setOpenEdit(true);
    setCategoryNameEdit(category.categoryName);
    setEditId(category.id);
  }

  function handleSubmitEdit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id", editId);
    formData.append("CategoryName", categoryNameEdit);
    for (let i = 0; i < img.length; i++) {
      formData.append("CategoryImage", img[i]);
    }
    editCategories(formData);
    setOpenEdit(false)

  }

  // useEffect()
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex justify-between items-center">
        <ul className="flex gap-2">
          <NavLink className='py-2 px-4 rounded-[4px] hover:bg-[#DBEAFE] hover:text-[#1D4ED8] ' to={"/other"}>Categories</NavLink>
          <NavLink className='py-2 px-4 rounded-[4px] hover:bg-[#DBEAFE] hover:text-[#1D4ED8] ' to={"/brands"}>Brands</NavLink>
          <NavLink className='py-2 px-4 rounded-[4px] hover:bg-[#DBEAFE] hover:text-[#1D4ED8] ' to={'/subcategories'}>Subcategories</NavLink>
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
            <Box className="flex flex-col">
              <IconButton
                color="primary"
                onClick={() => handleEditCategories(category)}
              >
                <BorderColorIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => deleteCategories(category.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </div>
        ))}
      </section>

      {/* add modal */}
      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add category"}</DialogTitle>
          <DialogContent className="w-[500px] ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
              <TextField
                label="Category name"
                value={categoryName}
                className="w-full"
                onChange={({ target }) => setCategoryName(target.value)}
              />
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
                  className="hidden"
                  onChange={handleBase64}
                />
              </label>
              <DialogActions>
                <Button type="reset" variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" autoFocus variant="contained">
                  Create
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>

      {/* edit modal */}
      <Fragment>
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit category"}</DialogTitle>
          <DialogContent className="w-[500px] ">
            <form onSubmit={handleSubmitEdit} className="flex flex-col gap-6 ">
              <TextField
                label="Category name"
                value={categoryNameEdit}
                className="w-full"
                onChange={({ target }) => setCategoryNameEdit(target.value)}
              />
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
                  className="hidden"
                  onChange={(e) => setImg(e.target.files)}
                />
              </label>
              <DialogActions>
                <Button
                  type="reset"
                  variant="outlined"
                  onClick={handleCloseEdit}
                >
                  Cancel
                </Button>
                <Button type="submit" autoFocus variant="contained">
                  Create
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default Other;
