import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BlazeTemplate from "/imports/ui/components/BlazeTemplate";

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

interface AppAppBarProps {
  mode: PaletteMode;
}

function AppAppBar({ mode }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  const links = [
      {label: "Tournaments", href: "/tournaments"},
      {label: "Tipjar", href: "https://salla.sa/dukkanwst", target:"_blank"},
  ]

    function myNavigate(href, target) {
      if (target == "_blank") {
          window.open(href, target);
      } else {
          navigate(href)
      }

    }

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
                <Link to="/">
                    <img
                        src="/logo.png"
                        style={logoStyle}
                    />
                </Link>
                <Box sx={{ml: 2, display: {xs: 'none', md: 'flex'}}}>
                    {
                        links.map(({ label, href, target }) => (
                            <MenuItem
                                key={href}
                                onClick={()=> myNavigate(href, target)}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    {label}
                                </Typography>
                            </MenuItem>

                        ))
                    }
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
                <span className="text-black"><BlazeTemplate template="loginButtons"/></span>

              {/*<Button*/}
              {/*  color="primary"*/}
              {/*  variant="text"*/}
              {/*  size="small"*/}
              {/*  component="a"*/}
              {/*  target="_blank"*/}
              {/*>*/}
              {/*  Sign in2*/}
              {/*</Button>*/}
              {/*<Button*/}
              {/*  color="primary"*/}
              {/*  variant="contained"*/}
              {/*  size="small"*/}
              {/*  component="a"*/}
              {/*  target="_blank"*/}
              {/*>*/}
              {/*  Sign up*/}
              {/*</Button>*/}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                  </Box>
                    {
                        links.map(({ label, href }) => (
                            <MenuItem onClick={()=> navigate(href)}>
                                {label}
                            </MenuItem>
                        ))
                    }

                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
