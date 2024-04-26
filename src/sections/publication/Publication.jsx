// @mui
import { useQuery } from '@apollo/client';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
// components

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 0, label: 'ẩn' },
  { value: 1, label: 'đã duyệt' },
];
const LIST_ALL_PUBLICATION = loader('../../graphql/queries/collections/ListCollections.graphql');

export default function Publiction() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditBlog = (id) => {
    navigate(PATH_DASHBOARD.publication.edit(id));
  };

  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  const [info, setInfo] = useState([]);
  const { data: collection } = useQuery(LIST_ALL_PUBLICATION, {
    variables: {
      input: {
        type_collection: 1,
        status_collection: 1,
      },
    },
  });
  console.log('collection', collection);
  useEffect(() => {
    if (collection) {
      setInfo(collection?.collections);
    }
  }, [collection]);

  return (
    <>
      {info.map((item, index) => (
        <Card sx={{ my: 2, padding: 2, backgroundColor: '#e0e0e0' }}>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={4}
                  md={1}
                  sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center' }}
                >
                  <item>{item.id}</item>
                </Grid>
                <Grid item xs={11}>
                  <item>
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography>{item.description}</Typography>
                  </item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sx={{ my: 2 }} md={1}>
              <item>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  style={{ color: '#333' }}
                >
                  <MoreVertOutlinedIcon />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleClose}>View</MenuItem>
                  <MenuItem onClick={()=>handleEditBlog(item.id)}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
              </item>
            </Grid>
          </Grid>
        </Card>
      ))}
      
    </>
  );
}
