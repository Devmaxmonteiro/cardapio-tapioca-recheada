import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <Layout
            title="Dashboard"
            description="Gerencie sua conta e assinatura"
        >
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Informações do usuário */}
                    <div className="bg-white rounded-xl p-8 shadow-card">
                        <h2 className="text-xl font-semibold mb-6">Informações da conta</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Nome
                                </label>
                                <p className="text-gray-900">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    E-mail
                                </label>
                                <p className="text-gray-900">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Informações da assinatura */}
                    <div className="bg-white rounded-xl p-8 shadow-card">
                        <h2 className="text-xl font-semibold mb-6">Assinatura</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Plano atual
                                </label>
                                <p className="text-gray-900">{user.plan.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Valor
                                </label>
                                <p className="text-gray-900">R$ {user.plan.price.toFixed(2)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Duração
                                </label>
                                <p className="text-gray-900">{user.plan.duration} dias</p>
                            </div>
                        </div>
                    </div>

                    {/* Estatísticas de uso */}
                    <div className="bg-white rounded-xl p-8 shadow-card md:col-span-2">
                        <h2 className="text-xl font-semibold mb-6">Estatísticas de uso</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Downloads hoje
                                </h3>
                                <p className="text-3xl font-bold text-primary">0/10</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Downloads restantes hoje
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Downloads totais
                                </h3>
                                <p className="text-3xl font-bold text-primary">0</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Downloads realizados
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Próxima renovação
                                </h3>
                                <p className="text-3xl font-bold text-primary">
                                    {new Date(Date.now() + user.plan.duration * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Data de renovação automática
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 