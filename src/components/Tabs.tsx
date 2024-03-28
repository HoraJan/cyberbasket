import { Box, Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import React, { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { makeStyles } from '../utils/styles';

const useStyle = makeStyles()((theme) => ({
  tabs: {
    marginBlockEnd: theme.spacing(2),
  },
}));

type Tab = {
    id: string,
    label: string,
    disabled?: boolean,
    component: ReactNode
}

export const Tabs = ({ tabs, defaultTab, paramName }: {tabs: Tab[], defaultTab?: string, paramName: string}) => {
  const { classes } = useStyle();

  const [params, setParams] = useSearchParams();
  let activeTabId = params.get(paramName) as string;
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  if (!activeTabId || !activeTab) activeTabId = defaultTab || '';

  return (
    <>
      <MuiTabs
        className={classes.tabs}
        value={activeTabId}
        onChange={(_, tabId) => setParams((value) => {
          if (value.has(paramName)) value.delete(paramName);
          if (typeof tabId !== 'string') return value;
          value.append(paramName, tabId);
          return value;
        })}
      >
        {tabs.map((tab) => (
          <MuiTab
            key={tab.id}
            id={`${paramName}-tab-${tab.id}`}
            value={tab.id}
            disabled={tab.disabled}
            label={tab.label}
          />
        ))}
      </MuiTabs>
      {tabs.map((tab) => (
        <React.Fragment key={tab.id}>
          {activeTabId === tab.id && (<Box flexGrow={1} id={`${paramName}-tabpanel-${tab.id}`} minHeight={0}>{tab.component}</Box>)}
        </React.Fragment>
      ))}
    </>
  );
};
