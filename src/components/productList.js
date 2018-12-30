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

let marks = {
  0: '€ 0',
  100: '€ 100',
}

class productList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      filters: {},
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
  }

  handleSliderChange = name => value => {
    this.setState({ filters: { ...this.state.filters, [name]: value } })
  }

  handleCheckboxChange = name => event => {
    this.setState({
      filters: { ...this.state.filters, [name]: event.target.checked },
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  filterProducts = node => {
    const products = this.props.products.allMarkdownRemark.edges
    const product = node.node.frontmatter
    const filters = this.state.filters
    let type = undefined
    let value = undefined
    let min = 0
    let max = 100

    for (var filter in filters) {
      if (filters.hasOwnProperty(filter)) {
        if (typeof filters[filter] === 'object') {
          type = filter
          min = filters[filter][0]
          max = filters[filter][1]
        } else if (typeof filters[filter] === 'boolean') {
        }
      }
    }
    switch (type) {
      case 'price':
        let prices = []

        for (var item in products) {
          prices.push(products[item].node.frontmatter.price)
        }

        let highest = Math.max(...prices)
        min = highest * (min / 100)
        max = highest * (max / 100)

        marks = { 0: '€0', 100: '€' + Math.max(...prices) }

        return product.price >= min && product.price <= max

      default:
        return true
    }
  }

  render() {
    const products = this.props.products.allMarkdownRemark.edges
    const FilteredProducts = products.filter(this.filterProducts)
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
                  <Typography>Beoordeling</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div style={{ width: 400, marginBottom: '0.5em' }}>
                    <Slider.Range
                      min={0}
                      marks={{ 0: 1, 25: 2, 50: 3, 75: 4, 100: 5 }}
                      step={null}
                      defaultValue={[0, 100]}
                      value={this.state.filters.review}
                      onChange={this.handleSliderChange('review')}
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
                const { id, name, price, image } = node.node.frontmatter
                const { excerpt, fields } = node.node
                const { slug } = fields
                const product = {
                  id,
                  name,
                  url: '/p' + slug,
                  price,
                  image,
                  description: excerpt,
                }
                return (
                  <Grid item md={5}>
                    <ProductCard product={product} key={i} />
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

export default productList
