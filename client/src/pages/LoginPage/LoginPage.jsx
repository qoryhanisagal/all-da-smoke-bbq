import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroLayout from '../../components/HeroLayout/HeroLayout';
import { heroBackgrounds } from '../../data/backgroundImages';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <HeroLayout
        heroImage={heroBackgrounds.hero4}
        heroTitle={isLogin ? "Welcome Back" : "Join All Da Smoke"}
        heroSubtitle={isLogin ? "Sign in to your account" : "Create your account and start ordering"}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Login/Register Toggle */}
                <div className="tabs tabs-boxed mb-6">
                  <a 
                    className={`tab flex-1 ${isLogin ? 'tab-active' : ''}`}
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </a>
                  <a 
                    className={`tab flex-1 ${!isLogin ? 'tab-active' : ''}`}
                    onClick={() => setIsLogin(false)}
                  >
                    Register
                  </a>
                </div>

                <form className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">First Name</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Enter your first name" 
                          className="input input-bordered w-full" 
                        />
                      </div>
                      
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Last Name</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Enter your last name" 
                          className="input input-bordered w-full" 
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="input input-bordered w-full" 
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input 
                      type="password" 
                      placeholder="Enter your password" 
                      className="input input-bordered w-full" 
                    />
                  </div>

                  {!isLogin && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Confirm Password</span>
                      </label>
                      <input 
                        type="password" 
                        placeholder="Confirm your password" 
                        className="input input-bordered w-full" 
                      />
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex justify-between items-center">
                      <label className="label cursor-pointer">
                        <input type="checkbox" className="checkbox checkbox-sm" />
                        <span className="label-text ml-2">Remember me</span>
                      </label>
                      <Link to="/forgot-password" className="link link-primary text-sm">
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-3">
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                        <span className="label-text text-sm">
                          I agree to the <Link to="/terms" className="link link-primary">Terms of Service</Link> and <Link to="/privacy" className="link link-primary">Privacy Policy</Link>
                        </span>
                      </label>
                    </div>
                  )}
                  
                  <button className="btn btn-primary w-full">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>
                </form>

                <div className="divider">OR</div>
                
                <div className="space-y-2">
                  <button className="btn btn-outline w-full">
                    <i className="bi bi-google mr-2"></i>
                    Continue with Google
                  </button>
                  <button className="btn btn-outline w-full">
                    <i className="bi bi-facebook mr-2"></i>
                    Continue with Facebook
                  </button>
                </div>

                {isLogin && (
                  <div className="text-center mt-4">
                    <span className="text-sm">Don't have an account? </span>
                    <button 
                      onClick={() => setIsLogin(false)} 
                      className="link link-primary text-sm"
                    >
                      Sign up here
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </HeroLayout>
    </div>
  );
}
