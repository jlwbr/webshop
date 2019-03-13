import React from 'react'
import Grid from '@material-ui/core/Grid'
import ProductCard from './productCard'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Checkbox from '@material-ui/core/Checkbox'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import Slider from 'rc-slider'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import 'rc-slider/assets/index.css'

let marks = {
  0: '€ 0',
  100: '€ 100',
}

class productList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      filters: {
        Categories: {},
        price: [0, 100],
      },
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.getPrices = this.getPrices.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.filterPrices = this.filterPrices.bind(this)
  }

  handleSliderChange = name => value => {
    this.setState({ filters: { ...this.state.filters, [name]: value } })
  }

  handleCheckboxChange = name => event => {
    this.setState({
      filters: {
        ...this.state.filters.Categories,
        [name]: event.target.checked,
      },
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  getPrices = () => {
    let prices = []
    for (let item in this.props.products) {
      prices.push(this.props.products[item].price)
    }
    console.log('prices:', prices)
    marks = {
      0: '€0',
      25: '€' + Math.round(Math.max(...prices) * 0.25),
      50: '€' + Math.round(Math.max(...prices) * 0.5),
      75: '€' + Math.round(Math.max(...prices) * 0.75),
      100: '€' + Math.round(Math.max(...prices)),
    }
    return prices
  }

  getCategories = () => {
    for (let item in this.props.products) {
      const category = this.props.products[item].categories

      if (!this.state.filters.Categories[category]) {
        this.setState({
          filters: {
            ...this.state.filters.Categories,
            [category]: true,
          },
        })
      }
    }
  }

  filterPrices = node => {
    const prices = this.getPrices()
    const highest = Math.max(...prices)
    let min = this.state.filters.price[0]
    let max = this.state.filters.price[1]

    min = highest * (min / 100)
    max = highest * (max / 100)
    return node.price >= min && node.price <= max
  }

  render() {
    if (!this.props.products) {
      return undefined
    } else {
      const products = this.props.products
      const FilteredProducts = products.filter(this.filterPrices)
      console.log('filter:', FilteredProducts)
      return (
        <div style={{ marginTop: '1.5em' }}>
          <Dialog fullScreen open={this.state.open} onClose={this.handleClose}>
            <AppBar style={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Prijs</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ width: 400, marginBottom: '0.5em' }}>
                  <Slider.Range
                    min={0}
                    marks={marks}
                    step={1}
                    defaultValue={[0, 100]}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Beoordeling</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ width: 400, marginBottom: '0.5em' }}>
                  <Slider.Range
                    min={0}
                    marks={{ 0: 1, 25: 2, 50: 3, 75: 4, 100: 5 }}
                    step={null}
                    defaultValue={[0, 100]}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Categorie</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="Categorie" name="category">
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="female"
                          checked={this.state.female}
                          onChange={this.handleCheckboxChange('female')}
                        />
                      }
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClose}
              style={{ margin: '10px 0px 0px 0px' }}
            >
              Resultaten
            </Button>
          </Dialog>

          <Grid container spacing={24}>
            <Hidden xsDown>
              <Grid item xs={3}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Prijs</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div style={{ width: 400, marginBottom: '0.5em' }}>
                      <Slider.Range
                        min={0}
                        marks={marks}
                        step={1}
                        defaultValue={[0, 100]}
                        value={this.state.filters.price}
                        onChange={this.handleSliderChange('price')}
                      />
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Categorie</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <RadioGroup aria-label="Categorie" name="category">
                      <FormControlLabel
                        value="female"
                        control={
                          <Checkbox
                            value="female"
                            checked={this.state.filters.female}
                            onChange={this.handleCheckboxChange('female')}
                          />
                        }
                        label="Female"
                        type="checkbox"
                      />
                    </RadioGroup>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={9}>
              <Hidden smUp>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleClickOpen}
                  style={{ width: '100%', margin: '0px 0px 1em 0px' }}
                >
                  Filter
                </Button>
              </Hidden>
              <Grid container spacing={24}>
                {FilteredProducts.map((node, i) => {
                  return (
                    <Grid item md={5} key={i}>
                      <ProductCard product={node} />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}

export default productList
