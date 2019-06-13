import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'


export default function FilterList(props) {
  const { options, statuses, handleToggle, } = props

  return <List>
    {options.map(value => {
      const { key, label, } = value
      const checked = statuses[key]
      const labelId = `checkbox-list-label-${key}`

      return (
        <ListItem key={`list-${key}`} role={undefined} dense button onClick={() => handleToggle(key)}>
          <ListItemIcon>
            <Checkbox
              checked={checked}
              tabIndex={-1}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={label} />
        </ListItem>
      )
    })}
  </List>
}