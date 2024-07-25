

import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SelectChangeEvent } from '@mui/material/Select';
import { DropdownItem } from './types';
import './Dropdown.css'; // Import the CSS file

interface CustomTreeItemProps {
  nodeId: string;
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
  expanded?: boolean;
  onToggle?: () => void;
}

const CustomTreeItem: React.FC<CustomTreeItemProps> = ({ nodeId, label, children, onClick, expanded = false, onToggle }) => (
  <li className="custom-tree-item">
    <div className="tree-item-label" onClick={onClick}>
      {children && (
        <span onClick={onToggle} className="tree-toggle-icon">
          {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </span>
      )}
      {label}
    </div>
    {children && expanded && <ul className="nested-tree">{children}</ul>}
  </li>
);

interface DropdownProps {
  data: DropdownItem[];
}

const DropdownComponent: React.FC<DropdownProps> = ({ data }) => {
  const [paths, setPaths] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Extract top level children (paths)
    const availablePaths = data.map((item) => item.label);
    setPaths(availablePaths);
  }, [data]);

  const handlePathChange = (event: SelectChangeEvent<string>) => {
    const path = event.target.value as string;
    setSelectedPath(path);
    setSelectedDate('');
    setSelectedVersion('');

    // Extract dates for the selected path
    const pathData = data.find((item) => item.label === path);
    if (pathData) {
      const availableDates = pathData.children?.map((item) => item.label) || [];
      setDates(availableDates);
    }
  };

  const handleDateChange = (event: SelectChangeEvent<string>) => {
    const date = event.target.value as string;
    setSelectedDate(date);
    setSelectedVersion('');

    // Extract versions for the selected date
    const pathData = data.find((item) => item.label === selectedPath);
    if (pathData && date) {
      const dateData = pathData.children?.find((item) => item.label === date);
      if (dateData) {
        const availableVersions = dateData.children?.map((item) => item.label) || [];
        setVersions(availableVersions);
      }
    }
  };

  const handleVersionChange = (event: SelectChangeEvent<string>) => {
    setSelectedVersion(event.target.value as string);
  };

  const handleSubmit = () => {
    const payload = {
      file_path: selectedPath,
      date: selectedDate,
      version: selectedVersion,
    };
    console.log(payload);
    // You can now send this payload to the backend using an API call
  };

  const handleToggle = (nodeId: string) => {
    setExpandedNodes((prevExpandedNodes) => {
      const newExpandedNodes = new Set(prevExpandedNodes);
      if (newExpandedNodes.has(nodeId)) {
        newExpandedNodes.delete(nodeId);
      } else {
        newExpandedNodes.add(nodeId);
      }
      return newExpandedNodes;
    });
  };

  const renderTreeItems = (nodes: DropdownItem[], path: string = ''): React.ReactNode =>
    nodes.map((node) => {
      const currentPath = path ? `${path} > ${node.label}` : node.label;
      const isExpanded = expandedNodes.has(currentPath);

      if (node.children && node.children.length > 0) {
        return (
          <CustomTreeItem
            key={currentPath}
            nodeId={currentPath}
            label={node.label}
            expanded={isExpanded}
            onToggle={() => handleToggle(currentPath)}
          >
            {renderTreeItems(node.children, currentPath)}
          </CustomTreeItem>
        );
      }
      return (
        <CustomTreeItem
          key={currentPath}
          nodeId={currentPath}
          label={node.label}
          onClick={() => {
            const [filePath, date, version] = currentPath.split(' > ');
            setSelectedPath(filePath);
            setSelectedDate(date);
            setSelectedVersion(version);
            const pathData = data.find((item) => item.label === filePath);
            if (pathData) {
              const availableDates = pathData.children?.map((item) => item.label) || [];
              setDates(availableDates);
              const dateData = pathData.children?.find((item) => item.label === date);
              if (dateData) {
                const availableVersions = dateData.children?.map((item) => item.label) || [];
                setVersions(availableVersions);
              }
            }
          }}
        />
      );
    });

  return (
    <div className="dropdown-container">
      <div className="sidebar">
        <Typography variant="h6" className="sidebar-title">
          Select Path
        </Typography>
        <ul className="custom-tree">
          {renderTreeItems(data)}
        </ul>
      </div>
      <div className="content">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="path-select-label">Select Path</InputLabel>
              <Select
                labelId="path-select-label"
                value={selectedPath}
                onChange={handlePathChange}
              >
                {paths.map((path) => (
                  <MenuItem key={path} value={path}>
                    {path}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="date-select-label">Select Date</InputLabel>
              <Select
                labelId="date-select-label"
                value={selectedDate}
                onChange={handleDateChange}
                disabled={!selectedPath}
              >
                {dates.map((date) => (
                  <MenuItem key={date} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="version-select-label">Select Version</InputLabel>
              <Select
                labelId="version-select-label"
                value={selectedVersion}
                onChange={handleVersionChange}
                disabled={!selectedDate}
              >
                {versions.map((version) => (
                  <MenuItem key={version} value={version}>
                    {version}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DropdownComponent;


/css


   .dropdown-container {
    display: flex;
  }
  
  .sidebar {
    width: 250px;
    height: 100vh;
    padding: 20px;
    background-color: #f7f7f7;
    border-right: 1px solid #ccc;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;
  }
  
  .sidebar-title {
    margin-bottom: 20px;
  }
  
  .custom-tree {
    list-style-type: none;
    padding-left: 10px;
    margin: 0;
  }
  
  .custom-tree-item {
    margin: 5px 0;
    position: relative;
  }
  
  .tree-item-label {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 4px;
    transition: background-color 0.3s;
    cursor: pointer;
  }
  
  .tree-item-label:hover {
    background-color: #e0e0e0;
  }
  
  .nested-tree {
    list-style-type: none;
    padding-left: 20px;
    margin: 0;
    position: relative;
  }
  
  .tree-toggle-icon {
    margin-right: 5px;
  }
  
  .custom-tree-item::before,
  .custom-tree-item::after {
    content: '';
    position: absolute;
    left: -20px;
  }
  
  .custom-tree-item::before {
    top: 0;
    bottom: 50%;
    width: 1px;
    background: #ccc;
  }
  
  .custom-tree-item::after {
    top: 50%;
    width: 10px;
    height: 1px;
    background: #ccc;
  }
  
  .content {
    margin-left: 270px; /* Adjust this value according to sidebar width */
    padding: 20px;
    width: 100%;
  }
  
