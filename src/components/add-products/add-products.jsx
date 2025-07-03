import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Switch,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect, Fragment } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";
// import UploadIcon from "@mui/icons-material/Upload";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import DeleteIcon from "@mui/icons-material/Delete";
import { useProducts } from "@/store/products/products";

export default function AddProducts() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  //   let [images, setImages] = useState([]);
  const {
    colors,
    getProducts,
    brands,
    getSubcategories,
    subcategories,
    setAddProducts,
  } = useProducts();
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [code, setCode] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brandSelect, setBrandSelect] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [count, setCount] = useState("");
  const [desctiption, setDesctiption] = useState("");
  const [value, setValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function goBack()
  const goBack = () => {
    navigate(-1);
  };

  //   function handleFileChange(e) {
  //     const files = Array.from(e.target.files);
  //     const newImages = [];

  //     files.forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         newImages.push({
  //           name: file.name,
  //           data: reader.result,
  //         });

  //         if (newImages.length === files.length) {
  //           setImages((prev) => [...prev, ...newImages]);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }

  //   function handleDeleteIamge(name, index) {
  //     setImages(images.filter((img) => img.name !== name && img.index !== index));
  //   }
  //   console.log(value)
  // componenti UploadBox baroi intikhob kardani suratho
  //   const UploadBox = () => {
  //     const fileInputRef = useRef(null);

  //     const handleClick = () => {
  //       fileInputRef.current.click();

  //     };

  //     return (
  //       <Box
  //         onClick={handleClick}
  //         sx={{
  //           border: "2px dashed #cbd5e1",
  //           borderRadius: "8px",
  //           p: 3,
  //           textAlign: "center",
  //           cursor: "pointer",
  //           backgroundColor: "#fff",
  //           ":hover": { backgroundColor: "#f9fafb" },
  //         }}
  //       >
  //         <Box
  //           sx={{
  //             backgroundColor: "#f1f5f9",
  //             width: 48,
  //             height: 48,
  //             mx: "auto",
  //             borderRadius: "50%",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             mb: 2,
  //           }}
  //         >
  //           <UploadIcon />
  //         </Box>
  //         <Typography variant="body1" fontWeight={600}>
  //           Click to upload or drag and drop
  //         </Typography>
  //         <Typography variant="caption" color="text.secondary">
  //           (SVG, JPG, PNG, or gif maximum 900×400)
  //         </Typography>

  //         <input
  //           type="file"
  //           hidden
  //           multiple
  //             ref={fileInputRef}
  //           value={value}
  //           onChange={(e) => setValue(e.target.value)}
  //         />
  //       </Box>
  //     );
  //   };

  useEffect(() => {
    getProducts();
    getSubcategories();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("BrandId", brandSelect);
    formData.append("DiscountPrice", discount);
    formData.append("Price", productPrice);
    formData.append("Quantity", count);
    formData.append("Code", code);
    //   formData.append("Images", value);

    for (let i = 0; i < value.length; i++) {
      formData.append("Images", value[i]);
    }

    formData.append("SubCategoryId", subCategory);
    formData.append("ProductName", productName);
    formData.append("HasDiscount", false);
    formData.append("Description", desctiption);
    formData.append("ColorId", selectedColor);

    setAddProducts(formData);
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center py-6">
          <div className="flex gap-3 items-center">
            <KeyboardBackspaceIcon
              onClick={goBack}
              className="cursor-pointer"
            />
            <h3 className="text-2xl text-[#111927] font-bold">
              Products / Add new
            </h3>
          </div>

          <div className="flex gap-3">
            <Button variant="outlined" type="reset">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </div>
        </div>

        <section className="grid grid-cols-[65%_35%] gap-6">
          <aside className="flex flex-col gap-10">
            {/* Information */}
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-[#131523]">Information</h2>

              <div className="flex gap-4">
                <TextField
                  label="Product name"
                  fullWidth
                  value={productName}
                  onChange={({ target }) => setProductName(target.value)}
                />
                <TextField
                  label="Code"
                  value={code}
                  onChange={({ target }) => setCode(target.value)}
                  sx={{ width: "150px" }}
                />
              </div>

              <TextField
                label="Description"
                multiline
                rows={4}
                value={desctiption}
                onChange={({ target }) => setDesctiption(target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
            </div>

            {/*  Categories & Brands  */}
            <div className="flex gap-8">
              <FormControl fullWidth>
                <InputLabel>Subcategories</InputLabel>
                <Select
                  label="Subcategories"
                  value={subCategory}
                  onChange={({ target }) => setSubCategory(target.value)}
                >
                  {subcategories.map((sub) => (
                    <MenuItem key={sub.id} value={sub.id}>
                      {sub.subCategoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Brands</InputLabel>
                <Select
                  label="Brands"
                  value={brandSelect}
                  onChange={({ target }) => setBrandSelect(target.value)}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.brandName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/*  Price  */}
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-[#131523]">Price</h2>
              <div className="flex gap-4">
                <TextField
                  label="Product price"
                  type="number"
                  value={productPrice}
                  onChange={({ target }) => setProductPrice(target.value)}
                />
                <TextField
                  label="Discount"
                  type="number"
                  value={discount}
                  onChange={({ target }) => setDiscount(target.value)}
                />
                <TextField
                  label="Count"
                  type="number"
                  value={count}
                  onChange={({ target }) => setCount(target.value)}
                />
              </div>

              <div className="flex gap-3 items-center mt-2">
                <Switch defaultChecked />
                <p className="text-[#131523]">Add tax for this product</p>
              </div>
            </div>

            {/*  Options  */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-[#131523]">Different Options</h2>
                <p className="text-[#737373]">
                  This product has multiple options
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex gap-4">
              <TextField label="Option 2" fullWidth />
              <TextField label="Value" fullWidth />
            </div>

            <Box>
              <Button variant="outlined">+ Add more</Button>
            </Box>
          </aside>

          <aside className="flex flex-col gap-7">
            {/*  Colors  */}
            <div className="border border-[#D9E1EC] p-5 rounded-[4px] flex flex-col gap-5">
              <div className="flex justify-between">
                <h2 className="font-bold text-[#131523]">Colors</h2>
                <div
                  onClick={handleClickOpen}
                  className="flex gap-1 text-[#2563EB] cursor-pointer"
                >
                  <CheckIcon />
                  <p>Create new</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {colors.map((color) => (
                  <div
                    key={color.id}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2`}
                    style={{ backgroundColor: color.colorName }}
                    onClick={() => setSelectedColor(color.id)}
                  ></div>
                ))}
              </div>
            </div>

            {/*  Tags  */}
            <div className="border border-[#D9E1EC] p-5 rounded-[4px] flex flex-col gap-5">
              <h2 className="font-bold text-[#131523]">Tags</h2>

              <div className="flex justify-between">
                <TextField label="Tags name" />
                <Box className="border border-[#2563EB] flex items-center justify-center p-[14px] rounded-[4px] cursor-pointer">
                  <DoneOutlineIcon color="primary" />
                </Box>
              </div>

              <div className="flex flex-wrap gap-2">
                {["T-Shirt", "Men Clothes", "Summer Collection"].map(
                  (tag, index) => (
                    <div
                      key={index}
                      className="flex gap-2 px-2 bg-[#E6E9F4] rounded-[4px]"
                    >
                      <p className="text-[#5A607F]">{tag}</p>
                      <CloseIcon className="cursor-pointer" color="action" />
                    </div>
                  )
                )}
              </div>
            </div>

            {/*  Intikhob kardani suratho  */}
            <div>
              <h2 className="font-bold text-[#131523] mb-2">Images</h2>
              {/* <UploadBox /> */}
            </div>
            <h1>asa</h1>
            <input
              placeholder="sss"
              type="file"
              multiple
              onChange={(e) => setValue(e.target.files)}
              // ref={fileInputRef}
              //   value={value}
            />

            {/* <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell align="right">File Name</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {images?.map((image, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">
                          <img
                            className="w-[54px] h-[54px] rounded-[8px] "
                            src={image.data}
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="right">{image.name}</TableCell>
                        <TableCell align="right">
                          <IconButton>
                            <DeleteIcon
                              onClick={() =>
                                handleDeleteIamge(image.name, index)
                              }
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer> */}
            
          </aside>
        </section>
        <Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"New color"}</DialogTitle>
            <DialogContent>
              <TextField label="Color" />
              <TextField type="color" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose} autoFocus>
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      </form>
    </div>
  );
}
