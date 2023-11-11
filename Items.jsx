import { Box, IconButton, ListItemButton, ListItemText, Stack} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; 
import { useEffect,useState } from "react";
import {getAll} from "../scenes/global/ApiCrud"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const Items = ()=>{
    const [apiData , setData] = useState([])
    useEffect(() => {
        async function onload() {
           
            const {data} = await getAll('/items');
              console.log("data",data)
            setData(data) 
          

        }
        onload()
    }, [])

      const  columns= [
          {
            label: "Category",
            field: `CategoryName`,
            sort: "asc",
          },
          {
            label: "Item Name",
            field: `itemname`,
            sort: "asc",
            width: 100,
          },
          {
            label: "Description",
            field: "description",
            sort: "asc",
            width: 200,
        
          },
          {
          label: "Sale Price",
          field: "saleprice",
          sort: "asc",
        },
        {
        label: "Purchase Price",
        field: "buyingprice",
        sort: "asc",
      },
          {
            label: "Quantity",
            field: "quantity",
            sort: "asc",
          },
          {
            label: "Country Made",
            field: "made_in",
            sort: "asc",
          },
          {
            label: "Barcode",
            field: "barcode",
            sort: "asc",
          },
          {
            label: "Action",
            field: "action",
            sort: "asc",
            width: 50,
          },
        ]

    const dataWithSequence = apiData.map((row,index) =>({
        ...row,
        sequence: index + 1,
        CategoryName: row.categoryId.CategoryName
    }))

    return (
      //General Box//
        <Box>

      {/* TBox Of the Contents */}
          <Box sx={{marginTop:"2%"}}>

          {/* itle and Add new Scope */}
          <Stack direction={'row'} sx={{justifyContent:"space-between"}}>
          <Box sx={{marginLeft:"5px" , fontSize:30}}>Items List </Box>
          <Stack direction={"row"}>
            <ListItemText sx={{fontSize:"30px",marginTop:"10px"}}>Add New Item</ListItemText>
          <ListItemButton>
          <AddCircleOutlineIcon sx={{marginRight:"10px", fontSize:30}}/>
          </ListItemButton>
          </Stack>
          </Stack>


          {/* DataGrid Scope */}
                <DataGrid 
                sx={{borderCollapse: "1px solid white"}}              
                rows={dataWithSequence}
                columns={columns}
                getRowId={(row) =>row._id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                />
            </Box>

        </Box>


)}

export default Items