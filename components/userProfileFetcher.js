import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase";

const UserProfileFetcher = ({
    children,
    onProfileLoaded,
    onError
}) => {
    const [profileData, setProfileData] = useState({
        userProfile: null,
        avatarUrl: null,
        isLoading: true
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session) {
                    const { data: profileData, error: profileError } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", session.user.id)
                        .single();

                    if (profileError) {
                        console.error("Error fetching user profile:", profileError);
                        onError?.(profileError);
                        setProfileData(prevState => ({ ...prevState, isLoading: false }));
                        return;
                    }

                    if (profileData) {
                        let avatarUrl = null;
                        if (profileData.avatar_url) {
                            const { data } = supabase.storage
                                .from("avatars")
                                .getPublicUrl(profileData.avatar_url);
                            avatarUrl = data.publicUrl;
                        }

                        setProfileData({
                            userProfile: profileData,
                            avatarUrl,
                            isLoading: false
                        });

                        onProfileLoaded?.(profileData);
                    }
                }
            } catch (error) {
                console.error("Unexpected error in fetchUserProfile:", error);
                onError?.(error);
                setProfileData(prevState => ({ ...prevState, isLoading: false }));
            }
        };

        fetchUserProfile();
    }, [onProfileLoaded, onError]);

    return children(profileData);
};

export default UserProfileFetcher;

