import React from 'react';
import { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import axios from 'axios';
import { Backdrop, Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, createSvgIcon, IconButton, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

let api = axios.create({
  baseURL: 'http://localhost:8081'
});

function App() {
  const [ filmes, setFilmes ] = useState([]);
  const [ generos, setGeneros] = useState([]);
  const [ selectedGeneros, setSelectedGeneros] = useState([])
  const [ keyFilme, setkeyFilme ] = useState("");
  const [ ano, setAno ] = useState(new Date().getFullYear())
  const [ classificacao, setClassificacao ] = useState("")
  const [ nome, setNome ] = useState("")
  const [ duracao, setDuracao ] = useState("00:00");
  const [ linkMais, setLinkMais ] = useState("");
  const [ progresso, setProgresso ] = useState(false);
  const [ alterar, setAlterar ] = useState(false);

  async function loadGeneros() {
    let resp = await api.get('/generos');
    setGeneros([...resp.data]);
  }
  function buscarGeneros (key, nome = null) {
    return generos.find(x => x._id == key || (nome != null && x.nome == nome))
  }
  function montarStringoGeneros (generosParam) {
    const listaGeneros = generosParam.map(x => buscarGeneros(x, x));
    return listaGeneros.filter(x => x != undefined).map(x => x.nome).join(', ');
  }
  function limparCampos () {
    setkeyFilme("");
    setAlterar(false);
    setNome("");
    setAno(new Date().getFullYear());
    setClassificacao("");
    setSelectedGeneros([]);
    setDuracao("00:00");
    setLinkMais("");
  }
  function popularValoresComponentsCadastroFilmes (filme) {
    loadGeneros();
    setNome(filme.nome);
    setkeyFilme(filme._id);
    setAno(filme.anoLancamento);
    setClassificacao(filme.classificacao);
    setSelectedGeneros(filme.generos);
    setDuracao(filme.duracao);
    setLinkMais(filme.linkMais);
    console.log(filme);
  }
  function abrirLink (link) {
    if (!!link)
      window.open(link);
  }
  async function listarFilmes () {
    const result = await api.get('/filmes');
    setFilmes([...result.data]);
  }
  function alterarGrid (idFilme) {
    try
    {
      let filme = filmes.find(x => x._id == idFilme);
      popularValoresComponentsCadastroFilmes(filme);
      setAlterar(true);
      listarFilmes();
    }
    catch (ex)
    {
      console.log(ex);
    }
  }
  function coletarFilme () {
    return {
      nome : nome,
      anoLancamento : ano,
      classificacao : classificacao,
      generos : selectedGeneros,
      duracao : duracao,
      linkMais : linkMais
    }
  } 
  async function adicionarFilme (event) {
    try
    {
      setProgresso(true);  
      await api.post('/filmes', coletarFilme());
      limparCampos();
      listarFilmes();
    }
    catch (ex)
    {
      console.log(ex);
    }
    finally
    {
      setProgresso(false)
    }
  }

  async function removerFilme (idFilme) {
    await api.delete(`/filmes/${idFilme}`);
    await listarFilmes();
  }
  async function alterarFilme () {
    try
    {
      await api.put(`/filmes/${keyFilme}`, coletarFilme());
      limparCampos();
    }
    catch (ex) 
    {
      console.log(ex);
    }
  }
  useEffect(() => {
    loadGeneros();
    listarFilmes();
  }, []);

  return (
    <div className="App">
      <Backdrop variant="outlined" open={progresso} color="primary">
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        <header className="App-header">
          <h1>Filmes</h1>
        </header>

        <Grid container spacing={1} style={{ flexGrow : 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label="Nome" fullWidth={true} variant="outlined" value={nome} onChange={x => setNome(x.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Duração"
              type="time"
              fullWidth={true}
              variant="outlined"
              value={duracao}
              onChange={x => setDuracao(x.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField 
              label="Ano de Lançamento" 
              type="number" 
              value={ano || new Date().getFullYear()} 
              onChange={(x) => setAno(x.target.value)} 
              inputProps={ { min : "1000", max : new Date().getFullYear() } }
              variant="outlined" 
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label="Classificação" value={classificacao} onChange={(x) => setClassificacao(x.target.value)} fullWidth={true} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Select
              fullWidth={true}
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={selectedGeneros}
              onChange={(x) => setSelectedGeneros(x.target.value)}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip style={{margin : "2px"}} key={value} label={buscarGeneros(value).nome} />
                  ))}
                </div>
              )}
            >
              {generos.map((g) => (
                <MenuItem key={g._id} value={g._id}>
                  {g.nome}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Link mais informações" fullWidth={true} variant="outlined" value={linkMais} onChange={x => setLinkMais(x.target.value)} />
          </Grid>
        </Grid>
      </Container>     
      <Container style={{ marginTop : "30px" }}>
        {
          (
            alterar ? (
              <>
                <Button variant="outlined" color="primary" style={{ marginLeft : "10px"}} onClick={alterarFilme}>
                  Alterar
                </Button>
                <Button variant="outlined" color="primary" style={{ marginLeft : "10px"}} onClick={() => limparCampos()}>
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" style={{ marginLeft : "10px"}} color="primary" onClick={adicionarFilme}>
                  Adicionar
                </Button>
              </>
            )
          )
        }
        <Button style={{ marginLeft : "10px"}} variant="outlined" color="primary" onClick={listarFilmes}>
          Listar
        </Button>
      </Container> 

      <Container style={{ marginTop : "20px"}}>
        {filmes.map((x) => (
          <Card key={x._id} style={{margin:10}}>
            <CardActionArea>
              <CardContent onClick={() => abrirLink(x.linkMais)}>
                <Typography gutterBottom variant="h5" component="h2">
                  {x.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Data de Lançamento : {x.anoLancamento}
                  <br />
                  Duração : {x.duracao}
                  <br />
                  Classificação : {x.classificacao}
                  <br />
                  Generos : {montarStringoGeneros(x.generos)}
                </Typography>
              </CardContent>
              <CardActions>
                  <Delete onClick={async () =>  await removerFilme(x._id)} />
                  <Edit onClick={async () => alterarGrid(x._id) } />
              </CardActions>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default App;
