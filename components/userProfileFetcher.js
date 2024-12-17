import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase";

const UserProfileFetcher = ({
    children,
    onProfileLoaded,
    onError
}) => {
    const [userProfile, setUserProfile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                        setIsLoading(false);
                        return;
                    }

                    if (profileData) {
                        setUserProfile(profileData);

                        if (profileData.avatar_url) {
                            const { data } = supabase.storage
                                .from("avatars")
                                .getPublicUrl(profileData.avatar_url);

                            setAvatarUrl(data.publicUrl);
                        }

                        onProfileLoaded?.(profileData);
                        console.log("User profile:", profileData);
                    }
                }
            } catch (error) {
                console.error("Unexpected error in fetchUserProfile:", error);
                onError?.(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Render children with profile data as a render prop
    return typeof children === 'function'
        ? children({ userProfile, avatarUrl, isLoading })
        : children;
};

export default UserProfileFetcher;