import React, { useState } from 'react';
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

var BuyButton = React.memo(({data, disabled}) => {
    let dataAttrs = {}
    for (let i in data) {
      dataAttrs[`data-item-${i}`] = data[i]
    }

    return (
        <Button variant="outlined" disabled={disabled} color="primary" size="small">
            <Typography
            variant="button"
            style={{
            color: 'inherit',
            textDecoration: 'none'
            }}
            id="buyButton"
            href='#'
            className='snipcart-add-item buyBtn'
            {...dataAttrs}
            >
            In winkelwagen
            </Typography>
        </Button>
    )
})

export default BuyButton;