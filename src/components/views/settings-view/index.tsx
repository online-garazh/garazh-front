import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PasswordIcon from '@mui/icons-material/Password';
import ShareIcon from '@mui/icons-material/Share';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type SyntheticEvent, useState } from 'react';

import { GeneralTab } from '~/components/views/settings-view/general-tab/general-tab';
import { type CountryType } from '~/types/app.type';

interface SettingsViewProps {
  countries: CountryType[];
}

export function SettingsView({ countries }: SettingsViewProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue);
  };
  const tabs = [
    {
      label: 'Загальні',
      content: () => <GeneralTab countries={countries} />,
      icon: <AccountBoxIcon sx={{ marginLeft: '-4px' }} />,
    },

    {
      label: 'Сповіщення',
      content: () => <div>Сповіщення</div>,
      icon: <NotificationsIcon sx={{ marginLeft: '-3px' }} />,
    },

    {
      label: 'Соціальні посилання',
      content: () => <div>Соціальні посилання</div>,
      icon: <ShareIcon sx={{ marginLeft: '-3px' }} />,
    },

    {
      label: 'Безпека',
      content: () => <div>Безпека</div>,
      icon: <PasswordIcon sx={{ marginLeft: '-3px' }} />,
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Налаштування
      </Typography>

      <Tabs indicatorColor="primary" aria-label="profile tabs" onChange={handleChange} value={activeTabIndex}>
        {tabs.map(({ label, icon }, index) => (
          <Tab
            aria-controls={`profile-tab-panel-${index}`}
            label={label}
            key={index}
            id={`profile-tab-${index}`}
            icon={icon}
            disableRipple
            iconPosition="start"
            sx={({ breakpoints }) => ({
              minHeight: 'auto',
              paddingLeft: 0,
              paddingRight: 0,
              marginRight: 5,
              fontWeight: '500',
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
          sx={{ paddingTop: 4 }}
        >
          {activeTabIndex === index && content()}
        </Box>
      ))}
    </Box>
  );
}
