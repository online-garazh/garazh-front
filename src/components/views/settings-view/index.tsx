import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type SyntheticEvent, useState } from 'react';

export function SettingsView() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };
  const tabs = [
    {
      label: 'Main',
      content: () => <div>Main info</div>,
    },

    {
      label: 'Password',
      content: () => <div>Password info</div>,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
        Налаштування
      </Typography>

      <Tabs indicatorColor="primary" aria-label="profile tabs" onChange={handleChange} value={activeTabIndex}>
        {tabs.map(({ label }, index) => (
          <Tab
            aria-controls={`profile-tab-panel-${index}`}
            label={label}
            key={index}
            id={`profile-tab-${index}`}
            sx={({ breakpoints }) => ({
              [breakpoints.down('sm')]: {},
            })}
          />
        ))}
      </Tabs>

      {tabs.map(({ content }, index) => (
        <Box
          aria-labelledby={`profile-tab-${index}`}
          hidden={activeTabIndex !== index}
          role="tab-panel"
          key={index}
          id={`profile-tab-panel-${index}`}
        >
          {activeTabIndex === index && content()}
        </Box>
      ))}
    </Box>
  );
}
