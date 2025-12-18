/**
 * apiClient
 * 
 * Cliente HTTP para comunicação com a API
 * Baseado em: docs/ESPECIFICACAO_INTEGRACAO_API.md
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request Interceptor - Adicionar token se necessário
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Adicionar token de autenticação se disponível
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Tratamento de erros padronizado
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Erro com resposta do servidor (400, 500, etc)
      return Promise.reject(error);
    } else if (error.request) {
      // Erro de rede (sem resposta do servidor)
      return Promise.reject(new Error('ERRO DE CONEXAO COM O SERVIDOR'));
    } else {
      // Erro na configuração da requisição
      return Promise.reject(new Error('ERRO AO PROCESSAR REQUISICAO'));
    }
  }
);
