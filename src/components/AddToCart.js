import React, { useState } from 'react';
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

var BuyButton = React.memo(({data}) => {
    let dataAttrs = {}
    for (let i in data) {
      dataAttrs[`data-item-${i}`] = data[i]
    }

    return (
        <Button variant="outlined" color="primary" size="small">
            <Typography
            variant="button"
            style={{
            color: '#3f51b5',
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