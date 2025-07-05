import { useNavigate, useParams } from "react-router-dom";
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
import { useProducts } from "@/store/products/products";

export default function EditProducts() {
  const navigate = useNavigate();

  const {
    getProductByID,
    productsByID,
    brands,
    getSubcategories,
    subcategories,
    editProduct,
     colors
  } = useProducts();

  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [code, setCode] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brandSelect, setBrandSelect] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const { id } = useParams();
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

  useEffect(() => {
    getProductByID(id);
    getSubcategories();
  }, []);

  useEffect(() => {
    if (productsByID?.productName) {
      setProductName(productsByID.productName); 
      setCode(productsByID.code);
      setDescription(productsByID.description); 
      setBrandSelect(productsByID.brand);
      setProductPrice(productsByID.price);
      setDiscount(productsByID.discountPrice);
      setCount(productsByID.quantity);
    }
  }, [productsByID]);

function handleSubmit(e) {
  e.preventDefault();

  const formData = {
    Id: productsByID.id,
    BrandId: brandSelect,
    DiscountPrice: discount,
    Price: productPrice,
    Quantity: count,
    Code: code,
    ColorId: selectedColor,
    SubCategoryId: subCategory,
    ProductName: productName,
    Description: description,
    HasDiscount: false,
  };

  editProduct(formData); 
  clearAllForm();
  navigate("/products"); 
}


  function clearAllForm() {
    setProductName(""),
      setBrandSelect(""),
      setSubCategory(""),
      setProductPrice(""),
      setDiscount(""),
      setCount(""),
      setDescription(""),
      setCode("");
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
              Products / Edit Products {id}
            </h3>
          </div>

          <div className="flex gap-3">
            <Button variant="outlined" onClick={clearAllForm} type="reset">
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
                value={description}
                onChange={({ target }) => setDescription(target.value)}
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
                  {brands.map((el) => (
                    <MenuItem key={el.id} value={el.id}>
                      {el.brandName}
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
                    className={`w-8 h-8 rounded-full cursor-pointer ${color.id === selectedColor ? "border-2 border-blue-600" : "border-transparent"}`}
                    style={{ backgroundColor: productsByID.color }}
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
