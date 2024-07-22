//dropdown.tsx


import React, { useState, MouseEvent } from 'react';
import {
  Menu,
  MenuItem,
  Button,
  TextField,
  ListItemText,
  IconButton,
  Popover,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { DropdownItem } from './types';

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<Record<string, HTMLElement | null>>({});
  const [selectedPath, setSelectedPath] = useState<string>('');

  const handleClick = (event: MouseEvent<HTMLElement>, path: string) => {
    setSubMenuAnchorEl({ ...subMenuAnchorEl, [path]: event.currentTarget });
  };

  const handleClose = (path: string) => {
    setSubMenuAnchorEl({ ...subMenuAnchorEl, [path]: null });
  };

  const handleSelect = (path: string) => {
    setSelectedPath(path);
    setAnchorEl(null);
    setSubMenuAnchorEl({});
  };

  const renderMenuItems = (items: DropdownItem[], path: string) => {
    return items.map((item, index) => {
      const currentPath = `${path} > ${item.label}`;
      return (
        <MenuItem
          key={currentPath}
          onMouseEnter={(event) => {
            if (item.children) {
              handleClick(event, currentPath);
            }
          }}
          onClick={() => {
            if (!item.children) {
              handleSelect(currentPath);
            }
          }}
        >
          <ListItemText primary={item.label} />
          {item.children && renderSubMenu(item.children, currentPath)}
        </MenuItem>
      );
    });
  };

  const renderSubMenu = (items: DropdownItem[], path: string) => {
    return (
      <Popover
        key={path}
        anchorEl={subMenuAnchorEl[path]}
        open={Boolean(subMenuAnchorEl[path])}
        onClose={() => handleClose(path)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          onMouseLeave: () => handleClose(path),
        }}
      >
        {renderMenuItems(items, path)}
      </Popover>
    );
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {renderMenuItems(items, 'root')}
      </Menu>
      <TextField
        label="Selected Path"
        value={selectedPath}
        fullWidth
        variant="outlined"
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default Dropdown;



//types.ts
// types.ts
export interface DropdownItem {
    label: string;
    children?: DropdownItem[];
  }


//app.tsx



import React from 'react';
import Dropdown from './Components/Dropdown/Dropdown';
import { DropdownItem } from './Components/Dropdown/types';

const menuItems: DropdownItem[] = [
  {
    label: '1',
    children: [
      {
        label: '1.1',
        children: [
          { label: '1.1.1' },
          {
            label: '1.1.2',
            children: [
              { label: '1.1.2.1' },
              {
                label: '1.1.2.2',
                children: [
                  { label: '1.1.2.2.1' },
                  { label: '1.1.2.2.2' },
                ],
              },
            ],
          },
        ],
      },
      { label: '1.2' },
    ],
  },
  {
    label: '2',
    children: [
      {
        label: '2.1',
        children: [
          {
            label: '2.1.1',
            children: [
              { label: '2.1.1.1' },
              { label: '2.1.1.2' },
            ],
          },
        ],
      },
      {
        label: '2.2',
        children: [
          { label: '2.2.1' },
          { label: '2.2.2' },
        ],
      },
    ],
  },
  {
    label: '3',
    children: [
      {
        label: '3.1',
        children: [{ label: '3.1.1' }],
      },
      { label: '3.2' },
    ],
  },
  {
    label: '4',
    children: [
      { label: '4.1' },
      { label: '4.2' },
    ],
  },
  { label: '5' },
  { label: '6' },
  {
    label: '7',
    children: [
      {
        label: '7.1',
        children: [
          { label: '7.1.1' },
          { label: '7.1.2' },
        ],
      },
      {
        label: '7.2',
        children: [
          { label: '7.2.1' },
          { label: '7.2.2' },
        ],
      },
    ],
  },
  {
    label: '8',
    children: [
      {
        label: '8.1',
        children: [
          { label: '8.1.1' },
          { label: '8.1.2' },
        ],
      },
    ],
  },
  { label: '9' },
  { label: '10' },
  { label: '11' },
  { label: '12' },
];

const App: React.FC = () => {
  return (
    <div>
      <h1>Dynamic Dropdown Menu</h1>
      <Dropdown items={menuItems} />
    </div>
  );
};

export default App;

