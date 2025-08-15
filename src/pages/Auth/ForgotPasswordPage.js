import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await axios.post('/api/auth/forgot-password', { email });
            setMessage('Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Erro ao solicitar recuperação de senha.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Recuperar senha</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm font-medium">E-mail</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar link de recuperação'}
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

export default ForgotPasswordPage;
