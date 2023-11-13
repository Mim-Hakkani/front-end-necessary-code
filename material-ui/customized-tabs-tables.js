/*
 1. Tabs Customized with color and selected icon 
 2. Beautiful Table With pagination 
 3. search bar working  with (enter and  button)

 */

//  Main code  for tabs 

import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
    Button,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
  } from "@mui/material";
 
//tab section for change order management  
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


// consumer authenticated pages 
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
import withConsumerAuth from "../../../components/Dashboard/PrivateRoute/withConsumerAuth";


// titile for seo
import Title from "../../../components/Header/Title";
import Pending from "../../../components/Dashboard/ConsumerDashboard/order-management/Pending";
import Approved from "../../../components/Dashboard/ConsumerDashboard/order-management/Approved";
import Courier from "../../../components/Dashboard/ConsumerDashboard/order-management/Courier";
import Boxing from "../../../components/Dashboard/ConsumerDashboard/order-management/Boxing";
import Shipped from "../../../components/Dashboard/ConsumerDashboard/order-management/Shipped";
import Shipping from "../../../components/Dashboard/ConsumerDashboard/order-management/Shipping";
import AllPurchaseList from "../../../components/Dashboard/ConsumerDashboard/purchase-list-Management/AllPurchaseList";
import PaidPurchaseOrder from "../../../components/Dashboard/ConsumerDashboard/purchase-list-Management/PaidPurchaseOrder";
import ToPaidPurchaseOrder from "../../../components/Dashboard/ConsumerDashboard/purchase-list-Management/ToPaidPurchaseOrder";
import ReceivedPurchaseLists from "../../../components/Dashboard/ConsumerDashboard/purchase-list-Management/ReceivedPurchaseLists";

// class style for tab 

const tabStyle={
    fontFamily: "Roboto",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    color:"#666776",
    minWidth:'45px',
   
    // selected active tab 
    textTransform: "capitalize",
    "&.Mui-selected": {
        color: "var(--primary)",
      },

      // responsive tab list 
    "@media (max-width: 768px)": {
      fontSize: "14px",
    },
  }




const myPurchaseList = ({ token }) => {

    const [orderValue, setOrderValue] = useState('all');
    const handleChangeOrderManagement = (event, newValue) => {
        setOrderValue(newValue);
    };


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };




    const handleFocus = () => {
      setIsClicked(true);
    };
  
    const handleBlur = () => {
      setIsClicked(false);
    };
  


  return (
    <div>
     
    <Title>My Purchase List | Ehsan Marketing</Title>

    {/* order management heading  */}

    <Box>
        <Typography variant="h4" 
        sx={{
            color:"#2B2B2B",
            fontSize:'24px'
        }}>My Order</Typography>
        <Typography variant="body2" 
        sx={{
            color:"#6A6A6A"
        }}
        
        >Your all order are listed here, you can tracking your product easily.</Typography>
    </Box>

    {/* order management main section  */}

    <Box sx={{
        borderRadius: "4px",
        border: "1px solid #DEDEDE",
        background: "#FFF",
        mt:'26px'
    }}>

             {/* tabs for order managements  */}

     <Box >
      <TabContext value={orderValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeOrderManagement} aria-label="all order management lists"
            sx={{
                "& .MuiTabs-indicator": {              
                    backgroundColor:"var(--primary)"
                },
            }}
          >
            <Tab label="All     " value="all" sx={tabStyle}/>
            <Tab label="To Pay  " value="To Pay" sx={tabStyle}/>
            <Tab label="Paid    " value="Paid" sx={tabStyle}/>
            <Tab label="Received" value="Received" sx={tabStyle}/>
            <Tab label="Returned" value="Returned" sx={tabStyle}/>
          </TabList>
        </Box>

   
       {/* tabs panels with compoents  */}
        <TabPanel label="all     " value="all">
           <AllPurchaseList/>  
        </TabPanel>

        <TabPanel label="To Pay  " value="To Pay">
          <ToPaidPurchaseOrder/>
        </TabPanel>

        <TabPanel label="Paid    " value="Paid">
          <PaidPurchaseOrder/>
        </TabPanel>

        <TabPanel label="Received" value="Received">
          <ReceivedPurchaseLists/>
        </TabPanel>

        <TabPanel label="Returned" value="Returned">
          <Shipping/>
        </TabPanel>
  
      </TabContext>
    </Box>

      
    </Box>


 

      
    </div>
  );
};

export default myPurchaseList;


// this section is used for next js 

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  if (getSessionCookie === null || !getUser || getUser.isStaff) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};


/***************** Component First TabPales   ************** */
import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Divider, Grid, Typography, IconButton,
    InputAdornment } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import { useQuery } from "@apollo/client";
import { GlobalContext } from "../../../../pages/_app";
import { PENDING_ORDER_MANAGEMNT } from "../../../../apolloClient/queries/order/order-management/pending-order-management";
import Link from "next/link";
import { ALL_PURCHASE_ORDER_NEW } from "../../../../apolloClient/queries/order/purchase-order-management/all-orders";


function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell
         align="center"
          style={{
            color:'#2b2b2b',
            background: "#EBEBEB",
            fontWeight:500,
            fontSize:'13px'
          }}
          className="tableBorder"
        >
          {" "}
          Serial
        </TableCell>
        <TableCell
          align="center"
          style={{
            color:'#2b2b2b',
            background: "#EBEBEB",
            fontWeight:500,
            fontSize:'13px'
          }}
          className="tableBorder"
        >
          {" "}
          Order No.
        </TableCell>
        <TableCell
          align="center"
          style={{
            color:'#2b2b2b',
            background: "#EBEBEB",
            fontWeight:500,
            fontSize:'13px'
          }}
          className="tableBorder"
        >
          Order Date
        </TableCell>

        <TableCell
          align="center"
          style={{
            color:'#2b2b2b',
            background: "#EBEBEB",
            fontWeight:500,
            fontSize:'13px'
          }}
          className="tableBorder"
        >
          {" "}
          Vat
        </TableCell>
        <TableCell
          align="center"
          style={{
            paddingLeft: "10px",
            background: "#EBEBEB",
            fontWeight:500,
            fontSize:'13px'
          }}
          className="tableBorder"
        >
          Commission(৳)
        </TableCell>

        <TableCell
          align="center"
          style={{
            color:'#2b2b2b',
            background: "#EBEBEB",
            fontWeight:500,
            fontSize:'13px'
          }}
          className="tableBorder"
        >
          Dis.
        </TableCell>
       

        <TableCell
          align="center"
          style={{
            color:'#2b2b2b',
            background: "#EBEBEB",
            fontWeight:500,
            fontSize:'13px'
          }}
          className="tableBorder"
        >
        Payable Amt.(৳)
        </TableCell>

        <TableCell
          align="center"
          style={{
            color:'#2b2b2b',
            background: "#EBEBEB",
            fontWeight:500,
            fontSize:'13px'
          }}
          className="tableBorder"
        >
         Payment
        </TableCell>

        <TableCell
          align="center"
          style={{
            color:'#2b2b2b',
            background: "#EBEBEB",
            fontWeight:500,
            fontSize:'13px'
          }}
          className="tableBorder"
        >
         Product Track
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const AllPurchaseList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchText, setSearchText] = useState("");
  const [searchOrder, setSearchOrder] = useState(0);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const {token} = useContext(GlobalContext)
  const [isClicked, setIsClicked] = useState(false);
  // Fetch reference-1 consumers
  const { data, error, loading, fetchMore } = useQuery(
    ALL_PURCHASE_ORDER_NEW, {
    variables: {
        searchNo:searchOrder || 0,
        before: null, 
        last: 16 },

    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });


  // outline color change when 

  const outlineColor = () => {
    if (searchText.length > 0 && typeof searchText === "string") {
      return "var(--primary)";
    }  else {
      return "transparent";
    }
  };
  
 

  //Search text handler
  const searchTextHandler = (e) => {
    if(e.target.value){
        setSearchText(e.target.value)
    }
    else{
        
        setSearchOrder(0);
        setSearchText("");
    
    }
  
  };
  const searchClearHandler = (e) => {
    setSearchText("");
    setSearchOrder(0);

  };

  const handleChangePage = (event, newPage) => {
    const length = (data?.myPurchaseOrders?.edges).length;
    const pageData = newPage * 15;
    setPage(newPage);
    if (newPage && pageData === length - 1) {
      setFetchMoreLoading(true);

      dataLoadHandler(15);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const length = (data?.myPurchaseOrders?.edges).length;
    const rowPerPage = event.target.value;
    if (length > rowPerPage) {
      setRowsPerPage(parseInt(rowPerPage, 10));
      setPage(0);
    }
  };

  // Fetch more data when click next button
  const dataLoadHandler = (page) => {
    const { startCursor } =
      data?.myPurchaseOrders?.pageInfo;
    fetchMore({
      variables: { before: startCursor, last: page },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.myPurchaseOrders?.edges = [
          ...data?.myPurchaseOrders?.edges,
          ...fetchMoreResult?.myPurchaseOrders?.edges,
        ];

        setFetchMoreLoading(false);

        return fetchMoreResult;
      },
    });
  };

  // Search consumer handler
  const searchPendingOrder = () => {
    setSearchOrder(parseInt(searchText))
  };

  if (loading) {
    return <img 
    src="/images/spinner.gif" 
    alt="spinner"
       style={{
        display:'block',
        margin:'0 auto'
       }}
    />;
  }
  if (error) {
    return <div>Something went wrong....</div>;
  }

  //Show transaction history data
  const tableData = (
    data?.myPurchaseOrders?.edges
  )
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      //console.log(row?.node?.username)
      return (
        <TableRow className="rowHover" tabIndex={-1} key={index}>
          <TableCell className="tableBorder" align="center" sx={{
            fontSize:'13px',
            color:'#2B2B2B',
            fontWeight:400,
            py:2

          }}>
            {page * rowsPerPage + ++index}
          </TableCell>
          <TableCell className="tableBorder" align="center" sx={{
            fontSize:'13px',
            color:'#2B2B2B',
            fontWeight:400,

          }}>
            {row?.node?.orderNo}
            </TableCell>
          <TableCell className="tableBorder" align="center" sx={{
            fontSize:'13px',
            color:'#2B2B2B',
            fontWeight:400,

          }}>
          {row?.node?.createdDate}
          </TableCell>
          <TableCell className="tableBorder" align="center" sx={{
            fontSize:'13px',
            color:'#2B2B2B',
            fontWeight:400,

          }}>
          ৳{row?.node?.vatPrice.toFixed(2)}
          </TableCell>
          
          <TableCell className="tableBorder" align="center" sx={{
            fontSize:'13px',
            color:'#2B2B2B',
            fontWeight:400,

          }}>
          ৳{row?.node?.commission.toFixed(2)}
          </TableCell>
          <TableCell className="tableBorder" align="center"  sx={{
            fontSize:'13px',
            color:'#2B2B2B',
            fontWeight:400,

          }}>
          ৳{row?.node?.discount.toFixed(2)}
          </TableCell>


          <TableCell className="tableBorder" align="center"  sx={{
            fontSize:'13px',
            color:'#2B2B2B',
            fontWeight:400,

          }}>
          ৳{row?.node?.totalPayableAmt.toFixed(2)}
          </TableCell>

          

          <TableCell className="tableBorder" align="center" sx={{
            fontSize:'13px',
            fontWeight:500,

          }}>
          {row?.node?.isPaid
 ? <Box 
 style={{background:'#008000',borderRadius:'22px',padding: "6px 20px",color:'#fff'}}

  disabled
  >Paid</Box> :
 <Box style={{
  background:'#E65100',borderRadius:'22px',padding: "6px 20px",color:'#fff',width:'96px',borderBottom: "2px solid #AF3F03",cursor:'pointer'}}>Pay Now</Box> 
  }
          </TableCell>

  

          <TableCell className="tableBorder" align="center">
            <Link href={`/consumer-dashboard/sales-product/my-online-sales/${row?.node?.id}`}>
            <img src="/images/product-track.png" alt="track-png" style={{
               display:'flex',
               alignItems:'center',
               justifyContent:'center',
               margin:'0 auto',
               cursor:'pointer'
            }}/>
             </Link>
          </TableCell>
        </TableRow>
      );
    });

    

  return (
    <>

          <Grid container spacing={2} 
          sx={{padding:"0px!important"}}>
            <Grid item xs={12} md={12}>
            
                <Box className="searchSection">
                  <Typography className="searchInput" sx={{marginTop:{xs:'10px', sm:'inherit'}, height:{xs:'40px', sm:'inherit'}, borderRadius:'5px', outline: `1px solid ${outlineColor()}`}} component="div">
                    <InputBase
                      size="small"
                      variant="outlined"
                      fullWidth
                      placeholder="Search order or invoice"
                      onChange={searchTextHandler}
                      // type="number"
                      value={searchText}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            searchPendingOrder();
                        }
                      }}

                     
                      

                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon sx={{ml:1,color:'#AFAFAF'}}/>
                        </InputAdornment>
                      }

                      inputProps={{
                        style: {
                          
                          marginLeft:'-10px'
                        },
                      }}


                    />
                      
                   {searchText && <ClearIcon
                      className="clearIcon"
                      onClick={searchClearHandler}
                    />}

                  </Typography>
                  <Typography
                    onClick={searchPendingOrder}
                    sx={{
                      cursor: "pointer",
                      padding: "10px 25px",
                      borderRadius:'4px',
                      marginLeft: "5px",
                      fontSize: { xs: "14px", sm: "14px", md: "14px" },
                      backgroundColor:'var(--primary)',
                      color:'#fff'
                    }}
                 
                  >
                    Search
                  </Typography>
                </Box>

                <TableContainer style={{ paddingTop: "15px" }}>
                  <Table
                    sx={{
                      minWidth: 150,
                  
                    }}
                    aria-labelledby="tableTitle"
                    size="small"
                  >
                    <EnhancedTableHead currency="$" />
                    <TableBody>
                      {/* Show tbale bodt data */}
                      {tableData}
                    </TableBody>
                  </Table>
                </TableContainer>

                {fetchMoreLoading ? (
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src="/images/ref_loading.gif"
                      alt="ref_loading"
                      style={{
                        width: "85px",
                        height: "85px",
                      }}
                    />
                  </Box>
                ) : (
                  <TablePagination
                    rowsPerPageOptions={[15, 50, 100]}
                    component="div"
                    count={
                       data?.myPurchaseOrders?.edges
                            .length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}
              
            </Grid>
          </Grid>
      
    
    </>
  );
};


export default AllPurchaseList;




//************************** */ graphql api************

import { gql } from '@apollo/client';

export const ALL_PURCHASE_ORDER_NEW = gql`
	query($searchNo: Int, $last: Int, $before: String) {
		myPurchaseOrders(searchNo: $searchNo, last: $last, before: $before) {
			edges {
				node {
					id
					createdDate
					orderNo
					vatPrice
					commission
					discount
					totalPayableAmt
					isPaid
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}
`;
