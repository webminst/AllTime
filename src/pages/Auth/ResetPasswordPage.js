import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (senha !== confirmarSenha) {
            setError('As senhas não coincidem.');
            return;
        }
        setLoading(true);
        try {
            await axios.post(`/api/auth/reset-password/${token}`, { senha });
            setMessage('Senha redefinida com sucesso! Você pode fazer login.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Erro ao redefinir senha. O link pode estar expirado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Redefinir senha</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm font-medium">Nova senha</label>
                <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <label className="block mb-2 text-sm font-medium">Confirmar nova senha</label>
                <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    disabled={loading}
                >
                    {loading ? 'Redefinindo...' : 'Redefinir senha'}
                </button>
            </form>
            {message && <div className="mt-4 text-green-600">{message}</div>}
            {error && <div className="mt-4 text-red-600">{error}</div>}
            <div className="mt-6 text-sm">
                <Link to="/login" className="text-indigo-600 hover:underline">Voltar ao login</Link>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
